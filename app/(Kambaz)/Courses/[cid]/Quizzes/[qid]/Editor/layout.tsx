"use client";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { useParams, usePathname } from "next/navigation";
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const { cid, qid } = useParams();
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser?.role != "FACULTY") {
    return <div>Access Denied</div>;
  };
  return (
    <div>
      <Nav className="mb-3" variant="tabs">
        <Nav.Item>
          <Nav.Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`}
            active={pathname === `/Courses/${cid}/Quizzes/${qid}/Editor`}> Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}
            active={pathname === `/Courses/${cid}/Quizzes/${qid}/Editor/Questions`}> Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div>{children}</div>
    </div>
  );
}

