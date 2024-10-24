import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import { useState } from "react";

function App() {
  const [video, setVideo] = useState(null);
  return (
    <div className="container border d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center mb-5 fw-bolder">YouTube Downloader</h1>
      <SearchBar setVideo={setVideo} />
      {video && <Result video={video} />}
    </div>
  );
}

export default App;
