import { useState } from "react";

export default function SearchBar({ setVideo, setFetching }) {
  const [url, setUrl] = useState("");

  const fetchVideo = async (url) => {
    try {
      setVideo(null);
      setFetching(true);
      const response = await fetch("http://localhost:4000/fetch-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        console.error("Error fetching the video");
        return;
      }

      const videoInfo = await response.json();

      setFetching(false);
      setVideo(videoInfo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="row w-100 justify-content-center">
      <div className="col-lg-6 col-md-9 col-sm-12">
        <div className="input-group">
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
    </div>
  );
}
