export default function Result(videoInfo) {
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

  const uniqueFormats = [
    ...new Map(
      videoInfo.video.formats.map((format) => [format.quality, format])
    ).values(),
  ];

  // Function to extract numeric value from filesize string
  const parseFilesize = (sizeString) => {
    const size = parseFloat(sizeString); // Extract the number from the string
    return size; // Assuming it's all in MB, just return the number
  };

  // Sort uniqueFormats by file size in ascending order
  const sortedUniqueFormats = uniqueFormats.sort((a, b) => {
    const sizeA = a.filesize ? parseFilesize(a.filesize) : 0; // Ensure filesize exists
    const sizeB = b.filesize ? parseFilesize(b.filesize) : 0; // Ensure filesize exists

    return sizeB - sizeA; // Ascending order
  });

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="row container mt-3">
      <div className="col d-flex flex-column align-items-center">
        <img
          src={videoInfo.video.thumbnail}
          alt="thumbnail"
          style={{ maxWidth: "250px" }}
          className="mt-3"
        />
        <p className="m-0 text-center text-wrap fw-bold mt-1">
          {videoInfo.video.title}
        </p>
        <p className="m-0 text-center">
          {formatTime(videoInfo.video.duration)}
        </p>
      </div>
      <div className="col p-0">
        <table className="table table-sm table-bordered text-center align-middle mt-3">
          <thead className="text-start">
            <tr>
              <th colSpan={3} className="px-2">
                Video
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUniqueFormats
              .filter((format) => format.mimeType.includes("video/mp4"))
              .filter((format) => format.filesize.includes("MB"))
              .map((format, index) => (
                <tr key={index}>
                  <td>{format.quality}</td>
                  <td>{format.filesize}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDownload(format.url)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <thead className="text-start">
            <tr>
              <th colSpan={3} className="px-2">
                Audio
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUniqueFormats
              .filter((format) => format.mimeType.includes("audio"))
              .map((format, index) => (
                <tr key={index}>
                  <td>MP3</td>
                  <td>{format.filesize}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDownload(format.url)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
