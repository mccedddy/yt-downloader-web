import { useState } from "react";

export default function SearchBar({ setVideo }) {
  const [url, setUrl] = useState("");

  const fetchVideo = (url) => {
    setVideo("video details");
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
