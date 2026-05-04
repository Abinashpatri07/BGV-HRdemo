import { Download, Plus, UserPlus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// import BulkUpload from "../pages/BulkUpload";

const ProfileHeader = ({ showExport, showAddCandidate }) => {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef();

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center mb-4">
      
      {/* Left Section */}
      <div>
        <p className="text-3xl font-semibold text-gray-800">
          Hi Puja Good Morning!
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Let's Customize Your Workspace
        </p>
      </div>

      {/* Right Section */}
      <div className="flex gap-3 items-center">
        
        {/* Export */}
        {showExport && (
          <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
            <Download className="w-4 h-4" />
            Export
          </button>
        )}

        {/* Add Candidate Dropdown */}
        {showAddCandidate && (
          <div className="relative" ref={dropdownRef}>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown(!openDropdown);
              }}
              className="flex items-center gap-2 text-white px-3 py-1 rounded-lg text-sm bg-[#01026E]"
            >
              <Plus className="w-4 h-4" />
              Add Candidate
            </button>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-50">

                {/* Single */}
                <div
                  onClick={() => {
                    setOpenDropdown(false);
                    navigate("/create-candidate");
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <UserPlus size={16} />
                  <span>Add Single</span>
                </div>

                {/* Bulk */}
                <div
                  onClick={() => {
                    setOpenDropdown(false);
                    navigate("/bulk-upload");
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Upload size={16} />
                  <span>Add in Bulk</span>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileHeader;