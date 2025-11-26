"use client";
import { FormControl, FormSelect, FormCheck, FormLabel, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, setAssignments } from "../reducer";
import * as client from "../client";

export default function AssignmentEditor() {
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  if (!courseId) return <div>Course ID not found</div>;

  const onCreateAssignmentForCourse = async () => {
    if (!courseId) return;
    const newAssignment = {
      title,
      description,
      points,
      assignment_group: assignmentGroup,
      display_grade_as: displayGradeAs,
      submission_type: submissionType,
      due_date: dueDate,
      available_date: availableFrom,
      until_date: availableUntil,
      course: courseId,
    };
    const created = await client.createAssignmentForCourse(courseId, newAssignment);
    dispatch(addAssignment(created));
  };

  const onUpdateAssignment = async (assignment: any) => {
    await client.updateAssignment(courseId, assignment);
    const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a );
    dispatch(setAssignments(newAssignments));
  };
    
  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
  );

  const [title, setTitle] = useState(assignment?.title || "");
  const [description, setDescription] = useState(assignment?.description || "");
  const [points, setPoints] = useState(assignment?.points || 0);
  const [assignmentGroup, setAssignmentGroup] = useState(assignment?.assignment_group?.toUpperCase() || "ASSIGNMENT");
  const [displayGradeAs, setDisplayGradeAs] = useState(assignment?.display_grade_as?.toUpperCase() || "PERCENTAGE");
  const [submissionType, setSubmissionType] = useState(assignment?.submission_type?.toUpperCase() || "ONLINE");
  const [dueDate, setDueDate] = useState(assignment?.due_date ? assignment.due_date.split("T")[0] : "");
  const [availableFrom, setAvailableFrom] = useState(assignment?.available_date ? assignment.available_date.split("T")[0] : "");
  const [availableUntil, setAvailableUntil] = useState(assignment?.until_date ? assignment.until_date.split("T")[0] : "");

  const saveAssignment = async () => {
    const payload = {
      _id: assignment?._id,
      title,
      description,
      points,
      assignment_group: assignmentGroup,
      display_grade_as: displayGradeAs,
      submission_type: submissionType,
      due_date: dueDate,
      available_date: availableFrom,
      until_date: availableUntil,
      course: cid,
    };

  if (assignment?._id) {
    await onUpdateAssignment(payload);
  } else {
    await onCreateAssignmentForCourse();
  }

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">

      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Assignment Name"
        className="mb-3"/>

      <FormControl
        as="textarea"
        id="wd-description"
        style={{ height: "300px" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3"/>

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Points
        </FormLabel>
        <Col sm="9">
          <FormControl
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            id="wd-points"/>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Assignment Group
        </FormLabel>
        <Col sm="9">
          <FormSelect
            value={assignmentGroup}
            onChange={(e) => setAssignmentGroup(e.target.value)}
            id="wd-group">
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
          <FormSelect
            value={displayGradeAs}
            onChange={(e) => setDisplayGradeAs(e.target.value)}
            id="wd-display-grade-as">
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
            <FormSelect
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value)}
              id="wd-submission-type"
              className="mb-3">
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
            <FormControl value="Everyone" id="wd-assign-to" className="mb-3" readOnly />
            <FormLabel className="d-block mb-3 fw-bold">Due</FormLabel>
            <FormControl
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mb-3"
              id="wd-due-date"/>
            <Row className="mb-3">
              <Col>
                <FormLabel className="mb-3 fw-bold">Available from</FormLabel>
                <FormControl
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  id="wd-available-from"/>
              </Col>
              <Col>
                <FormLabel className="mb-3 fw-bold">Until</FormLabel>
                <FormControl
                  type="date"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  id="wd-available-until"/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="btn-secondary me-3" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
          Cancel
        </Button>
        <Button className="btn-danger" onClick={saveAssignment}>
          Save
        </Button>
      </div>
    </div>
  );
}
