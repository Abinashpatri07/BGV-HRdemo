import { RefreshCw, List, CalendarDays, Trash2, Search, Upload } from "lucide-react";

function TableToolbar() {
  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
      
      {/* Left Side Buttons */}
      <div className="flex gap-2 flex-wrap">
        
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">
          All
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-sm">
          <RefreshCw size={16} />
          Refresh
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-sm">
          <List size={16} />
          Short by Name
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-sm">
          <CalendarDays size={16} />
          Short by Date
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-sm">
          <Trash2 size={16} />
          Trash
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        
        {/* Search */}
        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm"
          />
          <Search size={16} className="text-gray-500" />
        </div>

        {/* Export Button */}
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
          <Upload size={16} />
          Export
        </button>
      </div>

    </div>
  );
}

export default TableToolbar;