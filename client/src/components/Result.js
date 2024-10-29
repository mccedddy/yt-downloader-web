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
    const downloadUrl = `http://localhost:4000/download?url=${encodeURIComponent(
      url
    )}&itag=${itag}`;
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `${videoInfo.title}.mp3`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="row container mt-3">
      <div className="col d-flex flex-column align-items-center">
        <img
          src={videoInfo.thumbnail}
          alt="thumbnail"
          style={{ maxWidth: "250px" }}
          className="mt-3"
        />
        <p className="m-0 text-center text-wrap fw-bold mt-1">
          {videoInfo.title}
        </p>
        <p className="m-0 text-center">{formatTime(videoInfo.duration)}</p>
      </div>
      <div className="col p-0">
        <table className="table table-sm table-bordered text-center align-middle mt-3">
          <thead className="text-start">
            <tr>
              <th colSpan={3} className="px-2">
                Audio
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{videoInfo.formats.audio.quality}</td>
              <td>{videoInfo.formats.audio.filesize}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    handleDownload(videoInfo.url, videoInfo.formats.audio.itag)
                  }
                >
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
