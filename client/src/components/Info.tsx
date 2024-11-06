export default function Info() {
  return (
    <div className="row w-100 justify-content-center my-5">
      <div className="col-lg-7 col-md-9 col-sm-12">
        <div className="card">
          <h5 className="card-header">How It Works</h5>
          <div className="card-body">
            <h5 className="card-title">Description</h5>
            <p className="card-text" style={{ textAlign: "justify" }}>
              This website is designed to make downloading audio from YouTube
              videos quick and easy. Users can download YouTube audio files in
              MP3 format using just YouTube video links. This tool simplifies
              the process with just a few clicks.
            </p>

            <h5 className="card-title">Instructions</h5>
            <ol className="list-group list-group-numbered">
              <li className="list-group-item">
                Go to{" "}
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-danger"
                >
                  YouTube
                </a>
                , find the video you want to download, and copy the URL from the
                address bar.
                <div className="card mt-2">
                  <code className="card-header py-1 px-2">Example:</code>
                  <div className="card-body-sm">
                    <code className="text-danger card-text py-1 px-2">
                      https://www.youtube.com/watch?v=dQw4w9WgXcQ
                    </code>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                Paste the video URL in the downloader, click{" "}
                <span className="rounded bg-danger text-white px-1">
                  Search
                </span>
                , and wait for the details to load.
              </li>
              <li className="list-group-item">
                Once the video details appear, click{" "}
                <span className="rounded bg-danger text-white px-1">
                  Download
                </span>{" "}
                to start downloading the MP3 file.
              </li>
            </ol>

            <h5 className="card-title mt-3">About</h5>
            <p className="card-text" style={{ textAlign: "justify" }}>
              The YouTube MP3 downloader application is built with{" "}
              <strong>ReactJS</strong> for responsive user experience,{" "}
              <strong>NodeJS</strong> and <strong>Express</strong> for handling
              requests to fetch and download YouTube videos in MP3 format, and{" "}
              <strong>Bootstrap</strong> for styling and layout.
            </p>
            <a
              href="https://github.com/mccedddy/yt-downloader-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              Go to GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
