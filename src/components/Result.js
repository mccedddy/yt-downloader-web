export default function Result(video) {
  return (
    <div className="row container mt-3">
      <div className="col d-flex flex-column align-items-center">
        <img
          src="https://pulsephotography.com.au/wp-content/uploads/2017/10/16x9-placeholder.jpg"
          alt="thumbnail"
          style={{ maxWidth: "250px" }}
          className="mt-3"
        />
        <h5 className="m-0 text-center mt-1">Title</h5>
        <p className="m-0 text-center">00:00</p>
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
            <tr>
              <td>1080p</td>
              <td>3 MB</td>
              <td>
                <button className="btn btn-sm btn-primary">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
