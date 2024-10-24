const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch video
app.post("/fetch-video", async (req, res) => {
  const { url } = req.body;

  console.log(`\nReceived: ${url}`);

  // Validate the YouTube URL
  if (!ytdl.validateURL(url)) {
    console.error("Invalid YouTube URL");
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(url);

    // Sanitize the title
    const videoTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, "");

    // Create a structured response
    const videoInfo = {
      title: videoTitle,
      duration: info.videoDetails.lengthSeconds,
      thumbnail:
        info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]
          .url,
      formats: info.formats
        .filter((format) => format.hasAudio || format.hasVideo)
        .map((format) => ({
          quality: format.qualityLabel,
          mimeType: format.mimeType,
          filesize: format.contentLength
            ? `${(format.contentLength / (1024 * 1024)).toFixed(2)} MB`
            : "N/A",
          url: format.url,
        })),
    };

    res.json(videoInfo);
    console.log("Returned video info");
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).json({ error: "Failed to fetch video info" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
