"use client";
import * as client from "./client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical, BsFillCaretDownFill, BsJournalText } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentControls from "./AssignmentControls";
import { deleteAssignment, setAssignments } from "./reducer";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  if (!courseId) return <div>Course ID not found</div>;

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

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(courseId);
    dispatch(setAssignments(assignments));
  };

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(courseId, assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);
  
  return (
    <div>
      {isFaculty && <AssignmentControls cid={ courseId } />}<br />
      <ListGroup className="rounded-0" id="wd-modules">

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill className="me-1 fs-6" /> ASSIGNMENTS
            {isFaculty && <AssignmentsControlButtons />}
          </div>

          <ListGroup className="wd-lessons rounded-0">
          {assignments.map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                {assignment.title}
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until </span>
                  {formatDateTime(assignment.available_date)} |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due </span>
                  {formatDateTime(assignment.due_date)} | {assignment.points}{assignment.display_grade_as === "points" ? " pts" : "%"}
                </div>
              </div>
              {isFaculty && <div className="ms-3">
                <AssignmentControlButtons
                      assignmentId={assignment._id}
                      deleteAssignment={(assignmentId) => onRemoveAssignment(assignmentId)}
                      cid={ courseId }/>
              </div>}
            </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>

      </ListGroup>
    </div>
);}
