function ApplicationTable({ applications, onUpdateStatus, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Link</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No applications found.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{app.company}</td>
                <td className="px-4 py-2 border">{app.role}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={app.status}
                    onChange={(e) => onUpdateStatus(app._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  {new Date(app.dateOfApplication).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {app.link ? (
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Link
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => onDelete(app._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;