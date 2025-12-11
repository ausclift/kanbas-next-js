import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function QuizControlButtons({ quizId, deleteQuiz, cid }: {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
  cid: string;
}) {
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const toggleButtons = () => setShowButtons(!showButtons);
  return (
    <div className="float-end">
      {showButtons && (
        <>
          <FaPencil className="text-primary ms-2 me-2 mb-1"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${quizId}/Editor`)}/>
          <FaTrash className="text-danger me-2 mb-1"
            onClick={() => deleteQuiz(quizId)}/>
        </>
      )}
      <IoEllipsisVertical className="fs-4"
        onClick={toggleButtons} />
    </div>
  );
}