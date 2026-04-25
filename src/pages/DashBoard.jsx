import { useState } from "react"
import CardSection from "../components/CardSection"
import Pagination from "../components/Pagination"
import ProfileHeader from "../components/ProfileHeader"
import TableSection from "../components/TableSection"



const DashBoard = () => {
  const [page, setPage] = useState(1);
  const totalPages = 9;

  return (
    <div className="p-4 flex flex-col gap-5">
        <ProfileHeader showExport={true} showAddCandidate={false}/>
        <CardSection/>
        <TableSection isToolBarRequired = {false} />
        <Pagination currentPage={page}
        totalPages={9}
        onPageChange={setPage}/>
    </div>
)
}

export default DashBoard