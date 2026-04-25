import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import TableToolbar from "./TableToolbar";

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

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/candidates")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log("API DATA:", result);
  //       setData(result);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

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



  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {isToolBarRequired && <TableToolbar/>}
      
      <table className="w-full text-sm">
        
        {/* Header */}
        <thead className="bg-gray-50 text-gray-600">
          <tr>
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
              
              <td className="p-3">{item.cand_id}</td>
              <td className="p-3">CASE-{item.cand_id}</td>

              <td className="p-3">
                <div className="font-medium">{item.first_name} {item.last_name}</div>
                <div className="text-xs text-gray-400">
                  {item.Email}
                </div>
              </td>

              <td className="p-3">{item.Phone}</td>

              {/* Progress */}
              {/* <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-[#01026E] h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.progress}%
                  </span>
                </div>
              </td> */}
               <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-[#01026E] h-2 rounded-full"
                      style={{ width: `50%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    50%
                  </span>
                </div>
              </td>


              {/* Status */}
              {/* <td className="p-3">
                <span
                  className={`inline-block w-24 text-center px-2 py-1 text-xs rounded-full ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td> */}
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
              <td className="p-3 text-gray-500 flex items-center gap-1 cursor-pointer hover:text-black">
                <Eye size={16} />
                View
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TableSection;