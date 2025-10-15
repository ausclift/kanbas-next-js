"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical, BsFillCaretDownFill, BsJournalText } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentControls from "./AssignmentControls";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  const formatDateTime = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    return new Date(dateStr).toLocaleString(undefined, options);
  };
  return (
    <div>
      <AssignmentControls /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill className="me-1 fs-6" /> ASSIGNMENTS <AssignmentsControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href={`/Courses/${cid}/Assignments/${assignment._id}`} 
                  className="text-dark text-decoration-none">
                  {assignment.title}
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until </span>
                  {formatDateTime(assignment.available_date)} |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due </span>
                  {formatDateTime(assignment.due_date)} | {assignment.points} pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>

      </ListGroup>
    </div>
);}


