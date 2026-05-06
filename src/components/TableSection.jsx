import { Eye, Pencil, PauseCircle, XCircle, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import TableToolbar from "./TableToolbar";
import { useNavigate } from "react-router-dom";

function getStatusStyle(status) {
  switch (status) {
    case "Progress": return "bg-orange-100 text-orange-600";
    case "Verify":   return "bg-blue-100 text-blue-600";
    case "Complete": return "bg-green-100 text-green-600";
    case "Review":   return "bg-red-100 text-red-600";
    default:         return "bg-gray-100 text-gray-600";
  }
}

function TableSection({ isToolBarRequired }) {
  const [data, setData]                   = useState([]);
  const [loading, setLoading]             = useState(false);
  const [openMenu, setOpenMenu]           = useState(null);
  const [modalType, setModalType]         = useState(null);
  const [holdReason, setHoldReason]       = useState("");
  const [rejectReason, setRejectReason]   = useState("");
  const [selectedRows, setSelectedRows]   = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res    = await fetch("http://localhost:5000/api/candidates");
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

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? data.map((item) => item.cand_id) : []);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePlaceOnHold = () => {
    if (!holdReason.trim()) return;
    setModalType("holdSuccess");
    setHoldReason("");
  };

  const handleRejectApplication = () => {
    if (!rejectReason.trim()) return;
    setModalType("rejectSuccess");
    setRejectReason("");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCandidate(null);
    setHoldReason("");
    setRejectReason("");
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {isToolBarRequired && <TableToolbar />}

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={data.length > 0 && selectedRows.length === data.length}
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

          <tbody>
            {data.map((item) => (
              <tr key={item.cand_id} className="border-t hover:bg-gray-50">
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
                  <div className="font-medium">{item.first_name} {item.last_name}</div>
                  <div className="text-xs text-gray-400">{item.Email}</div>
                </td>
                <td className="p-3">{item.Phone}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 h-2 rounded-full">
                      <div className="bg-[#01026E] h-2 rounded-full" style={{ width: "50%" }} />
                    </div>
                    <span className="text-xs text-gray-500">50%</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`inline-block w-24 text-center px-2 py-1 text-xs rounded-full ${getStatusStyle("Progress")}`}>
                    Progress
                  </span>
                </td>
                <td className="p-3 relative">
                  {!isToolBarRequired ? (
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setOpenMenu(openMenu === item.cand_id ? null : item.cand_id)}
                        className="text-xl font-bold px-2"
                      >
                        ⋮
                      </button>

                      {openMenu === item.cand_id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                          <div
                            onClick={() => navigate(`/candidate/${item.cand_id}`)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            <Eye size={15} /> View
                          </div>
                          <div
                            onClick={(e) => { e.stopPropagation(); setOpenMenu(null); navigate(`/candidate/edit/${item.cand_id}`); }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            <Pencil size={15} /> Edit
                          </div>

                          {/* ✅ Send Email → opens email success modal */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenu(null);
                              setSelectedCandidate(item);
                              setModalType("emailSuccess");
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            <Mail size={15} /> Send Email
                          </div>

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenu(null);
                              setSelectedCandidate(item);
                              setModalType("hold");
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            <PauseCircle size={15} /> On Hold
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenu(null);
                              setSelectedCandidate(item);
                              setModalType("reject");
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 cursor-pointer text-sm"
                          >
                            <XCircle size={15} /> Reject
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => navigate(`/candidate/${item.cand_id}`)}
                      className="flex items-center gap-1 cursor-pointer hover:text-black text-sm"
                    >
                      <Eye size={15} /> View
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
      </div>

      {/* ===================== EMAIL SUCCESS MODAL ===================== */}
      {modalType === "emailSuccess" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white rounded-2xl shadow-2xl w-105 p-10 text-center">

            {/* Envelope illustration */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-20">
                {/* Envelope body */}
                <svg width="96" height="80" viewBox="0 0 96 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Envelope */}
                  <rect x="8" y="24" width="72" height="50" rx="6" fill="#C7D2FE" />
                  <rect x="8" y="24" width="72" height="50" rx="6" stroke="#818CF8" strokeWidth="1.5" />
                  {/* Envelope flap open */}
                  <path d="M8 30 L44 52 L80 30" stroke="#818CF8" strokeWidth="1.5" fill="none" />
                  {/* Letter inside */}
                  <rect x="22" y="34" width="44" height="32" rx="3" fill="white" />
                  <rect x="28" y="42" width="32" height="2" rx="1" fill="#C7D2FE" />
                  <rect x="28" y="48" width="26" height="2" rx="1" fill="#C7D2FE" />
                  <rect x="28" y="54" width="20" height="2" rx="1" fill="#C7D2FE" />
                  {/* Paper airplane */}
                  <path d="M62 8 L82 16 L62 24 L66 16 Z" fill="#6366F1" />
                  <path d="M66 16 L76 13" stroke="#6366F1" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-green-500 font-bold text-xl mb-3">
              Invitation E-Mail Send Successfully
            </h3>

            {/* Subtitle */}
            <p className="text-gray-500 text-sm mb-8">
              "We've Sent You An Email—Take A Look In Your Inbox."
            </p>

            {/* Okay button */}
            <button
              onClick={closeModal}
              className="px-10 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition active:scale-95"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* ===================== ON HOLD CONFIRM MODAL ===================== */}
      {modalType === "hold" && selectedCandidate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white rounded-2xl shadow-2xl w-145 p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 leading-snug">
              "Are You Sure You Want To Place
              <br />
              Candidate{" "}
              <span className="font-bold">TCS-{selectedCandidate.cand_id}</span>{" "}
              <span className="text-orange-500 font-bold">On Hold</span>"
            </h2>
            <div className="text-left mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason For Putting On Hold <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={holdReason}
                onChange={(e) => setHoldReason(e.target.value)}
                placeholder="Please describe the reason for placing this candidate on hold."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOnHold}
                disabled={!holdReason.trim()}
                className="px-8 py-2.5 border border-orange-400 text-orange-500 hover:bg-orange-50 rounded-lg font-medium transition disabled:opacity-40"
              >
                Place On Hold
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ON HOLD SUCCESS MODAL ===================== */}
      {modalType === "holdSuccess" && selectedCandidate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white rounded-2xl shadow-2xl w-125 overflow-hidden text-center">
            <div className="bg-orange-500 h-44 flex items-center justify-center rounded-b-[50%]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                <div className="w-8 h-8 bg-orange-500 rounded-lg" />
              </div>
            </div>
            <div className="px-10 py-8">
              <p className="text-orange-500 font-semibold text-lg leading-snug mb-3">
                "Candidate TCS-{selectedCandidate.cand_id} Has Been
                <br />Placed On Hold Successfully."
              </p>
              <p className="text-gray-500 text-sm mb-8">
                This Will Pause The Candidate's Progress In The
                <br />Hiring Process. You Can Resume It Anytime.
              </p>
              <button
                onClick={closeModal}
                className="px-10 py-2.5 border border-orange-400 text-orange-500 hover:bg-orange-50 rounded-lg font-medium transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== REJECT CONFIRM MODAL ===================== */}
      {modalType === "reject" && selectedCandidate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white rounded-2xl shadow-2xl w-145 p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 leading-snug">
              "Are You Sure You Want To{" "}
              <span className="text-red-500 font-semibold">Reject</span>
              <br />
              This Candidate{" "}
              <span className="font-bold">TCS-{selectedCandidate.cand_id}</span>"
            </h2>
            <div className="text-left mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                *Reason For Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please describe the reason for rejecting this candidate."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                className="px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectApplication}
                disabled={!rejectReason.trim()}
                className="px-8 py-2.5 border border-red-400 text-red-500 hover:bg-red-50 rounded-lg font-medium transition disabled:opacity-40"
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== REJECT SUCCESS MODAL ===================== */}
      {modalType === "rejectSuccess" && selectedCandidate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white rounded-2xl shadow-2xl w-125 overflow-hidden text-center">
            <div className="bg-red-500 h-44 flex items-center justify-center rounded-b-[50%]">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="2" width="20" height="28" rx="3" fill="#EF4444" />
                  <path d="M10 13L16 19M16 13L10 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M22 2H26C27.1 2 28 2.9 28 4V8H22V2Z" fill="#EF4444" />
                </svg>
              </div>
            </div>
            <div className="px-10 py-8">
              <p className="text-red-500 font-semibold text-lg leading-snug mb-3">
                "Candidate {selectedCandidate.cand_id} Has Been
                <br />Rejected Successfully."
              </p>
              <p className="text-gray-500 text-sm mb-8">
                This Will Mark The Application As Rejected
                <br />And Remove It From The Active Hiring Process.
              </p>
              <button
                onClick={closeModal}
                className="px-10 py-2.5 border border-red-400 text-red-500 hover:bg-red-50 rounded-lg font-medium transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableSection;