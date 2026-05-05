import { CheckCircle, XCircle } from "lucide-react";
import { useRef, useState } from "react";

const BulkUpload = () => {
  const fileRef = useRef();

  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(true);

  const data = [
    { name: "Padmini Gupta", phone: "+91 9854713254", email: "padmini457@gmail.com", function: "IT", tag: "May Batch" },
    { name: "Kamlesh Desai", phone: "+91 9854713254", email: "kamesh54@gmail.com", function: "IT", tag: "May Batch" },
    { name: "Puja Rani", phone: "+91 9854713254", email: "puja475@gmail.com", function: "Marketing", tag: "May Batch" },
    { name: "Deepak Nath", phone: "+91 9854713254", email: "deepak54@gmail.com", function: "Sales", tag: "June Batch" },
  ];

  const handleClick = () => fileRef.current.click();

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    const validTypes = [".csv", ".xls", ".xlsx"];
    const maxSize = 5 * 1024 * 1024;

    const isValidType = validTypes.some((ext) =>
      selectedFile.name.toLowerCase().endsWith(ext)
    );

    if (!isValidType || selectedFile.size > maxSize) {
      setUploadError(true);
      setFile(null);
      return;
    }

    setUploadError(false);
    setFile(selectedFile);
    setTimeout(() => setShowTable(true), 1200);
  };

  const handleFileChange = (e) => validateAndSetFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="p-6 bg-[#F4F7FE] min-h-screen relative">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-[#2B3674]">
            Bulk Upload Candidates
          </h2>
          <p className="text-xs text-gray-900">
            Upload Multiple Candidate Profiles At Once Using A Standardized File Format.
          </p>
        </div>

        {/* ================= STEP 1: UPLOAD ================= */}
        {!showTable && (
          <>
            <div
              onClick={!file ? handleClick : undefined}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition
                ${uploadError
                  ? "border-red-300 bg-red-50"
                  : "border-[#C3C6F5] bg-[#F4F7FE] hover:bg-[#eef0fc]"
                }`}
            >
              {file ? (
                <>
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                    <CheckCircle size={36} className="text-blue-600" />
                  </div>
                  <p className="text-[#01026E] font-semibold text-sm">
                    Document uploaded successfully
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{file.name}</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-[#E0EEFF] flex items-center justify-center mb-5">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 14C6 11.8 7.8 10 10 10H18L21 14H34C36.2 14 38 15.8 38 18V32C38 34.2 36.2 36 34 36H10C7.8 36 6 34.2 6 32V14Z"
                        fill="url(#folderGrad)"
                      />
                      <path
                        d="M22 29V21M22 21L19 24M22 21L25 24"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="folderGrad" x1="6" y1="10" x2="38" y2="36" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#5BB8F5" />
                          <stop offset="1" stopColor="#1A56DB" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="text-[#01026E] font-bold">Click Here</span>{" "}
                    to upload your File or Drag
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Supported formats: .CSV, .XLSX
                  </p>
                </>
              )}

              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                accept=".csv,.xls,.xlsx"
                className="hidden"
              />
            </div>

            {/* Error message */}
            {uploadError && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <XCircle size={13} />
                Upload Failed. Ensure Your File Is In The Correct Format And Size. Then Try Again.
              </p>
            )}
          </>
        )}

        {/* ================= STEP 2: TABLE ================= */}
        {showTable && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

            <div className="px-4 pt-4 pb-2 text-sm text-gray-500 border-b border-gray-100">
              Total Records: {data.length}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="accent-[#01026E]" />
                    </th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">E-Mail</th>
                    <th className="px-4 py-3 text-left">Function</th>
                    <th className="px-4 py-3 text-left">Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="accent-[#01026E]" />
                      </td>
                      <td className="px-4 py-3 text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{item.email}</td>
                      <td className="px-4 py-3 text-gray-600">{item.function}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {item.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 px-4 py-4 border-t border-gray-200 bg-white rounded-b-xl">
              <button
                onClick={() => { setShowTable(false); setFile(null); setUploadError(false); }}
                className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 active:scale-95 transition font-medium"
              >
                Back
              </button>
              <button
                className="px-6 py-2 bg-[#01026E] text-white rounded-lg text-sm hover:bg-[#02038a] active:scale-95 transition font-medium"
              >
                Upload
              </button>
            </div>
          </div>
        )}

        {/* ================= GUIDELINES — only on upload step ================= */}
{!showTable && (
  <div className="bg-[#FDF2F2] border border-[#FECACA] rounded-xl p-4">
    <p className="text-sm font-medium text-red-500 mb-2 flex items-center gap-2">
      ⚠ Important Guidelines
    </p>
    <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
      <li>Only .csv, .xls, .xlsx file types are accepted.</li>
      <li>Ensure that the sheet includes a header row.</li>
      <li>Full name, phone number and email must be present for each candidate.</li>
      <li>Keep your file within the allowed size limit (5MB).</li>
      <li>Currently, we accept batches of up to 1000 records at a time.</li>
      <li>We'll highlight any issues after upload.</li>
    </ul>
  </div>
)}

      </div>

      {/* ================= DUPLICATE MODAL ================= */}
      {showTable && showDuplicateModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
          <div className="bg-white rounded-2xl p-6 w-95 text-center shadow-xl">

            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-500 text-xl">⚠</span>
            </div>

            <h3 className="text-[#01026E] font-semibold text-base mb-1">
              10 Duplicate Records Found
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Some candidate data is already registered. You can remove duplicates and continue.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 active:scale-95 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="px-5 py-2 bg-[#01026E] text-white rounded-lg text-sm hover:bg-[#02038a] active:scale-95 transition font-medium"
              >
                Delete Duplicate Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;