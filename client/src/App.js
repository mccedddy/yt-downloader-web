import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import { useState } from "react";

function App() {
  const [video, setVideo] = useState(null);
  const [fetching, setFetching] = useState(false);
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
      <h1 className="text-center mb-5 fw-bolder">YouTube Downloader</h1>
      <SearchBar setVideo={setVideo} setFetching={setFetching} />
      {video && <Result videoInfo={video} />}
      {fetching && <div className="spinner my-5"></div>}
    </div>
  );
}

export default App;
