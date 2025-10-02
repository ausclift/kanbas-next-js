import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical, BsFillCaretDownFill, BsJournalText } from "react-icons/bs";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentControls from "./AssignmentControls";
import Link from "next/link";

export default function Assignments() {
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
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  A1 - ENV + HTML
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  A2 - CSS
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  A3 - JS
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  A4 - React
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill className="me-1 fs-6" /> QUIZZES <AssignmentsControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  Q1 - ENV + HTML
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  Q2 - CSS
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  Q3 - JS
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  Q4 - React
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill className="me-1 fs-6" /> EXAMS <AssignmentsControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  E1 - Midterm
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  E2 - Final
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill className="me-1 fs-6" /> PROJECT <AssignmentsControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsJournalText className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1">
                <Link 
                  href="/Courses/1234/Assignments/123" 
                  className="text-dark text-decoration-none">
                  Pazza Implementation
                </Link>
                <div className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | 
                  <span className="fw-bold"> Not Available Until</span> May 5 at 6:00pm |
                </div>
                <div className="fs-6">
                  <span className="fw-bold">Due</span> May 12 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-3">
                <AssignmentControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

      </ListGroup>
    </div>
);}
