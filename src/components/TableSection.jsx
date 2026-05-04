import { Eye, Pencil, PauseCircle, XCircle, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import TableToolbar from "./TableToolbar";
import { useNavigate } from "react-router-dom";

function getStatusStyle(status) {
  switch (status) {
    case "Progress":
      return "bg-orange-100 text-orange-600";
    case "Verify":
      return "bg-blue-100 text-blue-600";
    case "Complete":
      return "bg-green-100 text-green-600";
    case "Review":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function TableSection({ isToolBarRequired }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dropdown state
  const [openMenu, setOpenMenu] = useState(null);

  // Checkbox state
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/candidates");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Select All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((item) => item.cand_id));
    } else {
      setSelectedRows([]);
    }
  };

  // Select single row
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((i) => i !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      {isToolBarRequired && <TableToolbar />}

      <table className="w-full text-sm">
        {/* Header */}
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {/* Checkbox column */}
            <th className="p-3">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  data.length > 0 && selectedRows.length === data.length
                }
              />
            </th>

            <th className="p-3 text-left">Candidate ID</th>
            <th className="p-3 text-left">Case ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Progress</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((item) => (
            <tr key={item.cand_id} className="border-t hover:bg-gray-50">
              {/* Checkbox */}
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.cand_id)}
                  onChange={() => handleSelectRow(item.cand_id)}
                />
              </td>

              <td className="p-3">{item.cand_id}</td>
              <td className="p-3">CASE-{item.cand_id}</td>

              <td className="p-3">
                <div className="font-medium">
                  {item.first_name} {item.last_name}
                </div>
                <div className="text-xs text-gray-400">{item.Email}</div>
              </td>

              <td className="p-3">{item.Phone}</td>

              {/* Progress */}
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-[#01026E] h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">50%</span>
                </div>
              </td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`inline-block w-24 text-center px-2 py-1 text-xs rounded-full ${getStatusStyle(
                    "Progress"
                  )}`}
                >
                  Progress
                </span>
              </td>

              {/* Action */}
              <td className="p-3 relative">
                {!isToolBarRequired ? (
                  // ✅ Dashboard → ALWAYS 3 dots
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === item.cand_id ? null : item.cand_id
                        )
                      }
                      className="text-xl"
                    >
                      ⋮
                    </button>

                    {openMenu === item.cand_id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-10">

                        <div
                          onClick={() => navigate(`/candidate/${item.cand_id}`)}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </div>

                       <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(null);
                            navigate(`/candidate/edit/${item.id}`);
                          }}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Pencil size={16} />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(null);
                            console.log("Send Email clicked for:", item.cand_id);
                          }}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Mail size={16} />
                          <span>Send Email</span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                          <PauseCircle size={16} />
                          <span>On Hold</span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-600 cursor-pointer">
                          <XCircle size={16} />
                          <span>Reject</span>
                        </div>

                    </div>
                    )}
                  </div>
                ) : (
                  // ✅ Home → View button
                  <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                    <Eye size={16} />
                    View
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
}

export default TableSection;
