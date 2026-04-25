import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* ✅ TOP HEADER (FULL WIDTH) */}
      <div className="h-16 bg-white border-b flex items-center px-6">
        <Header />
      </div>

      {/* ✅ BELOW HEADER */}
      <div className="flex flex-1">
        
        {/* ✅ Sidebar LEFT */}
        <Sidebar />

        {/* ✅ Content RIGHT */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;