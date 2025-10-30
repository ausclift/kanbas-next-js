import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function AssignmentControlButtons({ assignmentId, deleteAssignment, cid }: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
  cid: string;
}) {
  const router = useRouter();
  return (
    <div className="float-end">
      <FaPencil className="text-primary me-2 mb-1"
        onClick={() => {router.push(`/Courses/${cid}/Assignments/${assignmentId}`)}}/>
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}