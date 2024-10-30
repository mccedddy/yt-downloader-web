const express = require("express");
const ytdl = require("@distube/ytdl-core");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Fetch video details
app.post("/fetch-video", async (req, res) => {
  const { url } = req.body;
  console.log(`\nReceived: ${url}`);

  // Validate YouTube URL
  if (!ytdl.validateURL(url)) {
    console.error("Invalid YouTube URL");
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);

    // MP3 formats only
    const mp3Format = info.formats.find(
      (format) => format.audioCodec && !format.videoCodec
    );

    const videoInfo = {
      title: info.videoDetails.title,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails.slice(-1)[0].url,
      url,
      formats: {
        audio: {
          quality: "MP3",
          filesize: mp3Format.contentLength
            ? `${(mp3Format.contentLength / (1024 * 1024)).toFixed(2)} MB`
            : "N/A",
          url: mp3Format.url,
          itag: mp3Format.itag,
        },
      },
    };

    res.json(videoInfo);
    console.log("Returned video info");
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).json({ error: "Failed to fetch video info" });
  }
});

// Download audio by itag
app.get("/download", (req, res) => {
  const { url, itag } = req.query;
  console.log(`\nDownloading: ${itag} ${url}`);

  if (!ytdl.validateURL(url)) {
    return res.status(400).send("Invalid YouTube URL.");
  }

  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Disposition", 'attachment; filename="download.mp4"');

  // Stream audio to client
  ytdl(url, {
    quality: itag,
    requestOptions: {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    },
  })
    .on("error", (error) => {
      console.error("Streaming error:", error);
      res.status(500).send("Error streaming video.");
    })
    .pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
