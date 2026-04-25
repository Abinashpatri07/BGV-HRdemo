import { UserPlus, Maximize2 } from "lucide-react"; // icon library
import { cardData } from '../domyData/cardData.js'


function Card({ numberOfCandidate, status }) {
  return (
    
    <div className="bg-white rounded-2xl shadow-sm p-4 w-80 border border-gray-200">
      
      {/* Top Section */}
    <div className="flex justify-between items-center mb-4">
  
      {/* Icon */}
      <div className="bg-green-100 p-2 rounded-lg">
        <UserPlus className="text-green-500 w-5 h-5" />
      </div>

      {/* ✅ Right side buttons */}
      <div className="flex items-center gap-2">
        
        <button className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm hover:bg-gray-100">
          View All
          <span className="text-lg">›</span>
        </button>

        <button className="border p-1 rounded-full">
          <Maximize2 className="w-4 h-4" />
        </button>

      </div>
    </div>

      {/* Number */}
      <h2 className="text-3xl font-bold text-gray-800">
        {numberOfCandidate}
      </h2>

      {/* Status */}
      <p className="text-gray-500 mt-1">{status}</p>
    </div>
    
  );
}


const CardSection = () => {
  return (
    <>
      <div className="flex justify-between">
        {cardData.map(ele => (<Card key={ele.id} {...ele}></Card>))}
      </div>
    </>
  )
}


export default CardSection