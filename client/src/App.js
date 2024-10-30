import SearchBar from "./components/SearchBar";
import Result from "./components/Result";
import Info from "./components/Info";
import Logo from "./assets/icons/logo.png";
import { useState } from "react";

function App() {
  const [video, setVideo] = useState(null);
  const [fetching, setFetching] = useState(false);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 pt-4">
      <div className="d-flex align-items-center mb-5">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "80px", height: "80px", marginRight: "20px" }}
        />
        <h1 className="fw-bolder w-auto m-0">
          YouTube MP3 <br />
          Downloader
        </h1>
      </div>
      <SearchBar setVideo={setVideo} setFetching={setFetching} />
      {video && <Result videoInfo={video} />}
      {fetching && <div className="spinner my-5"></div>}
      <Info />
      {/* {!video && !fetching && <Info />} */}
    </div>
  );
}

export default App;
