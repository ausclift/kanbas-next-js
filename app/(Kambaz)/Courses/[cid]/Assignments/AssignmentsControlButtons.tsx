import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { Button } from "react-bootstrap";
export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <Button size="sm" className="rounded-pill border border-dark text-dark bg-transparent px-3 me-2">
        100% of Total
      </Button>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}