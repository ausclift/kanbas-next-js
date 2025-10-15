"use client";
import { FormControl, FormSelect, FormCheck, FormLabel, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);
  if (!assignment) {
    return <div>Assignment not found.</div>;
  }
  const formatDate = (dateStr: string) => dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";
  return (
    <div id="wd-assignments-editor">

      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        defaultValue={assignment.title}
        placeholder="Assignment Name"
        className="mb-3"
      />

      <FormControl
        as="textarea"
        id="wd-description"
        style={{ height: "300px" }}
        defaultValue={assignment.description}
        className="mb-3"
      />

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Points
        </FormLabel>
        <Col sm="9">
          <FormControl type="number" defaultValue={assignment.points} id="wd-points"/>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Assignment Group
        </FormLabel>
        <Col sm="9">
          <FormSelect defaultValue={assignment.assignment_group?.toUpperCase()} id="wd-group">
            <option value="ASSIGNMENT">ASSIGNMENT</option>
            <option value="QUIZ">QUIZ</option>
            <option value="TEST">TEST</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Display Grade As
        </FormLabel>
        <Col sm="9">
          <FormSelect defaultValue={assignment.display_grade_as?.toUpperCase()} id="wd-display-grade-as">
            <option value="PERCENTAGE">PERCENT</option>
            <option value="POINTS">POINTS</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">
          Submission Type
        </FormLabel>
        <Col sm="9">
          <div className="p-3 border rounded">
            <FormSelect defaultValue={assignment.submission_type?.toUpperCase()} id="wd-submission-type" className="mb-3">
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </FormSelect>
            <FormLabel className="d-block mb-3 fw-bold">Online Entry Options</FormLabel>
            <FormCheck id="wd-text-entry" label="Text Entry" className="mb-3" />
            <FormCheck id="wd-website-url" label="Website URL" className="mb-3" />
            <FormCheck id="wd-media-recordings" label="Media Recordings" className="mb-3" />
            <FormCheck id="wd-student-annotation" label="Student Annotations" className="mb-3" />
            <FormCheck id="wd-file-upload" label="File Uploads" />
          </div>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">
          Assign
        </FormLabel>
        <Col sm="9">
          <div className="p-3 border rounded">
            <FormLabel className="d-block mb-3 fw-bold">Assign to</FormLabel>
            <FormControl defaultValue="Everyone" id="wd-assign-to" className="mb-3"/>
            <FormLabel className="d-block mb-3 fw-bold">Due</FormLabel>
            <FormControl type="date" defaultValue={formatDate(assignment.due_date)} className="mb-3" id="wd-due-date"/>
            <Row className="mb-3">
              <Col>
                <FormLabel className="mb-3 fw-bold">Available from</FormLabel>
                <FormControl type="date" defaultValue={formatDate(assignment.available_date)} id="wd-available-from"/>
              </Col>
              <Col>
                <FormLabel className="mb-3 fw-bold">Until</FormLabel>
                <FormControl type="date" defaultValue={formatDate(assignment.until_date)} id="wd-available-until"/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2">
      <Link href={`/Courses/${cid}/Assignments`} passHref>
        <Button variant="secondary">Cancel</Button>
      </Link>
      <Link href={`/Courses/${cid}/Assignments`} passHref>
        <Button variant="danger">Save</Button>
      </Link>
      </div>
    </div>
    
  );}