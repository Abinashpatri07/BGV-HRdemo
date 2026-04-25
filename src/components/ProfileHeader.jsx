import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ showExport, showAddCandidate }) => {
  const navigate = useNavigate();

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
      <div className="flex gap-3">
        
        {showExport && (
          <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
            <Download className="w-4 h-4" />
            Export
          </button>
        )}

        {showAddCandidate && (
          <button
            onClick={() => navigate("/create-candidate")}
            className="flex items-center gap-2 text-white px-3 py-1 rounded-lg text-sm bg-[#01026E]"
          >
            <Plus className="w-4 h-4" />
            Add Candidate
          </button>
        )}

      </div>
    </div>
  );
};

export default ProfileHeader;