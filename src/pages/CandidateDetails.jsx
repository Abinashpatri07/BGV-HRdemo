import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border p-5">
    <h3 className="text-[#2B3674] font-semibold mb-4 flex items-center gap-2">
      {title}
    </h3>
    {children}
  </div>
);

const Label = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium text-gray-700">{value}</p>
  </div>
);

const CandidateDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-4 max-w-6xl mx-auto bg-[#F4F7FE] min-h-[80vh] space-y-4">
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-700">
        Candidate ID: {id}
      </h2>

      {/* Top Section */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Personal Details */}
        <SectionCard title="👤 Personal Details">
          <div className="grid grid-cols-2 gap-4">
            <Label label="Full Name" value="Ramesh Kumar" />
            <Label label="Phone Number" value="+91 2584369401" />
            <Label label="Email ID" value="ramesh43@gmail.com" />
            <Label label="Date Of Birth" value="25/06/1998" />
            <Label label="Tag" value="May Batch" />
          </div>
        </SectionCard>

        {/* Address Details */}
        <SectionCard title="📍 Address Details">
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="text-xs text-gray-400">Current Address</p>
              <p>Suite 404, Magar Layout, Blankie Road</p>
              <p>Bangalore, Karnataka</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Permanent Address</p>
              <p>14 Krishna Avenue, Model Town, New Delhi</p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Identity Verification */}
      <SectionCard title="🪪 Identity Document Verification">
        <div className="grid grid-cols-2 gap-4">
          {["Aadhaar Card", "PAN Card", "Driving License", "Voter ID"].map((doc) => (
            <div key={doc} className="flex justify-between items-center border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium">{doc}</p>
                <p className="text-xs text-gray-400">XXXX-XXXX-0000</p>
              </div>
              <CheckCircle className="text-green-500" size={18} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Education */}
      <SectionCard title="🎓 Education Details">
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-xs">
            <tr>
              <th className="text-left">Qualification</th>
              <th className="text-left">Institute</th>
              <th>Year</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td>Post Graduate</td>
              <td>University of Strategic Planning</td>
              <td>2021</td>
              <td>8.95</td>
            </tr>
            <tr>
              <td>Graduate</td>
              <td>National Technical Institute</td>
              <td>2015</td>
              <td>8.68</td>
            </tr>
          </tbody>
        </table>
      </SectionCard>

      {/* Employment */}
      <SectionCard title="💼 Employment Details">
        <div className="space-y-4">
          <div className="flex justify-between items-start border-l-4 border-blue-600 pl-4">
            <div>
              <p className="font-medium">Dnqex Consulted</p>
              <p className="text-xs text-gray-500">UI/UX Designer</p>
              <p className="text-xs text-gray-400">
                Lead Specialist for Crisis Management
              </p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              2025 - Present
            </span>
          </div>

          <div className="flex justify-between items-start border-l-4 border-blue-600 pl-4">
            <div>
              <p className="font-medium">Global Logistics Ltd.</p>
              <p className="text-xs text-gray-500">UI/UX Designer</p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              2022 - 2025
            </span>
          </div>
        </div>
      </SectionCard>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        
        <SectionCard title="🧪 Drug Test">
          <p className="text-sm text-gray-600">Test Date</p>
          <p className="font-medium">26-02-2026</p>
          <button className="text-blue-600 text-sm mt-2">
            View Lab Report
          </button>
        </SectionCard>

        <SectionCard title="🚔 Criminal Record">
          <p className="text-green-600 font-medium">No Record</p>
          <p className="text-xs text-gray-400 mt-1">
            No prior criminal records found.
          </p>
        </SectionCard>
      </div>

      {/* Location Verification */}
      <SectionCard title="📍 Location Verification">
        <div className="grid grid-cols-3 gap-4 items-start shadow-md hover:shadow-lg transition">

            {/* On-Site Photo */}
            <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
                On-Site Photo
            </p>
            <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
                className="rounded-lg w-28 h-28 object-cover border"
            />
            </div>

            {/* Identity Selfie */}
            <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
                Identity Selfie
            </p>
            <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="rounded-lg w-28 h-28 object-cover border"
            />
            </div>

            {/* Status */}
            <div className="text-sm">
            <p className="text-xs font-medium text-gray-600 mb-2">
                Status
            </p>

            <p className="flex items-center gap-2">
                On-Site Photo
                <CheckCircle size={14} className="text-green-500" />
            </p>

            <p className="flex items-center gap-2 mt-1">
                Identity Selfie
                <CheckCircle size={14} className="text-green-500" />
            </p>

            <p className="mt-3 text-green-600 text-xs font-medium">
                All Files Uploaded
            </p>
            </div>

        </div>
      </SectionCard>

    </div>
  );
};

export default CandidateDetails;