const request = require("supertest");
const app = require("./server");

// Tests
describe("YouTube API Server", () => {
  describe("POST /fetch-video", () => {
    test("Returns video info for a valid YouTube URL", async () => {
      const response = await request(app)
        .post("/fetch-video")
        .send({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("duration");
      expect(response.body).toHaveProperty("thumbnail");
      expect(response.body).toHaveProperty("formats");
      expect(response.body.formats).toHaveProperty("audio");
    }, 10000);

    test("Returns 400 for an invalid YouTube URL", async () => {
      const response = await request(app)
        .post("/fetch-video")
        .send({ url: "invalid-url" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid YouTube URL");
    });
  });

  describe("GET /download", () => {
    test("Streams audio for a valid URL", async () => {
      const response = await request(app).get("/download").query({
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        itag: "140",
      });

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toBe("video/mp4");
      expect(response.headers["content-disposition"]).toBe(
        'attachment; filename="download.mp4"'
      );
    }, 10000);

    test("Returns 400 for an invalid YouTube URL", async () => {
      const response = await request(app).get(
        "/download?url=invalid-url&itag=140"
      );
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid YouTube URL.");
    });
  });
});
