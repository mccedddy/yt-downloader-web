import { useState, Dispatch, SetStateAction } from "react";
import { VideoInfo } from "../types";

type SearchBarProps = {
  setVideo: Dispatch<SetStateAction<VideoInfo | null>>;
  fetching: boolean;
  setFetching: Dispatch<SetStateAction<boolean>>;
};

export default function SearchBar({
  setVideo,
  fetching,
  setFetching,
}: SearchBarProps) {
  const [url, setUrl] = useState<string>("");

  const fetchVideo = async (url: string) => {
    if (!url) {
      console.log("No URL entered");
      return;
    }

    if (fetching) {
      return;
    }

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
        setFetching(false);
        return;
      }

      const videoInfo = await response.json();

      setFetching(false);
      setVideo(videoInfo);
    } catch (error) {
      console.error("Error:", error);
      setFetching(false);
    }
  };

  return (
    <div className="row w-100 justify-content-center">
      <div className="col-lg-7 col-md-9 col-sm-12">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter YouTube video URL"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            style={{ outline: "none", boxShadow: "none" }}
          ></input>
          <button
            type="submit"
            className="btn btn-outline-danger"
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
