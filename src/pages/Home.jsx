import { useState } from "react"
import Pagination from "../components/Pagination"
import ProfileHeader from "../components/ProfileHeader"
import TableSection from "../components/TableSection"
import TableToolbar from "../components/TableToolbar"


const Home = () => {
  const [page, setPage] = useState(1);
  const totalPages = 9;
  return (
    <div className="p-4 flex flex-col">
      <ProfileHeader showExport={false} showAddCandidate={true}/>
      <TableToolbar/>
      <TableSection/>
      <Pagination currentPage={page}
        totalPages={9}
        onPageChange={setPage}/>
    </div>
  )
}

export default Home