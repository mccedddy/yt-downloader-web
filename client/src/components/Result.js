export default function Result({ videoInfo }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        secs
      ).padStart(2, "0")}`;
    } else {
      return `${minutes}:${String(secs).padStart(2, "0")}`;
    }
  };

  const handleDownload = (url, itag) => {
    try {
      const downloadUrl = `http://localhost:4000/download?url=${encodeURIComponent(
        url
      )}&itag=${itag}`;
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${videoInfo.title}.mp3`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div className="row w-100 justify-content-center my-4">
      <div className="col-lg-4 col-md-6 col-sm-8">
        <div className="card">
          <img
            src={videoInfo.thumbnail}
            className="card-img-top"
            alt="thumbnail"
          ></img>
          <div className="card-body">
            <h5 className="card-title">{videoInfo.title}</h5>
            <p className="card-text text-body-secondary ">
              {formatTime(videoInfo.duration)}
            </p>
            <div className="input-group input-group-sm">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                MP3
              </span>
              <span className="input-group-text" id="inputGroup-sizing-sm">
                {videoInfo.formats.audio.filesize}
              </span>
              <button
                onClick={() => {
                  handleDownload(videoInfo.url, videoInfo.formats.audio.itag);
                }}
                className="btn btn-outline-danger"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
