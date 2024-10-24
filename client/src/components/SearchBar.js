import { useState } from "react";

export default function SearchBar({ setVideo }) {
  const [url, setUrl] = useState("");

  const fetchVideo = async (url) => {
    try {
      console.log("Fetching video...");

      const response = await fetch("http://localhost:4000/fetch-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        console.log("Error downloading the video");
        return;
      }

      const videoInfo = await response.json();

      console.log(videoInfo);
      setVideo(videoInfo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="row w-100">
      <div className="col-6 input-group">
        <span className="input-group-text">URL</span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter YouTube video URL"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="btn btn-outline-primary"
          onClick={() => {
            fetchVideo(url);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}
