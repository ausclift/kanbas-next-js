import { FormControl, FormSelect, FormCheck, FormLabel, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
const today = new Date().toISOString().split("T")[0];

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">

      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
        placeholder="Assignment Name"
        className="mb-3"
      />

      <FormControl
        as="textarea"
        id="wd-description"
        style={{ height: "300px" }}
        defaultValue={
`The assignment is available online.

Submit a link to the landing page of your web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
        className="mb-3"
      />

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Points
        </FormLabel>
        <Col sm="9">
          <FormControl type="number" defaultValue={100} id="wd-points"/>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Assignment Group
        </FormLabel>
        <Col sm="9">
          <FormSelect defaultValue="ASSIGNMENT" id="wd-group">
            <option value="ASSIGNMENT">Assignment</option>
            <option value="QUIZ">Quiz</option>
            <option value="TEST">Test</option>
            <option value="PROJECT">Project</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <FormLabel column sm="3" className="text-sm-end">
          Display Grade As
        </FormLabel>
        <Col sm="9">
          <FormSelect defaultValue="PERCENTAGE" id="wd-display-grade-as">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">
          Submission Type
        </FormLabel>
        <Col sm="9">
          <div className="p-3 border rounded">
            <FormSelect defaultValue="ONLINE" id="wd-submission-type" className="mb-3">
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
            <FormControl type="date" defaultValue={today} className="mb-3" id="wd-due-date"/>
            <Row className="mb-3">
              <Col>
                <FormLabel className="mb-3 fw-bold">Available from</FormLabel>
                <FormControl type="date" defaultValue={today} id="wd-available-from"/>
              </Col>
              <Col>
                <FormLabel className="mb-3 fw-bold">Until</FormLabel>
                <FormControl type="date" defaultValue={today} id="wd-available-until"/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2">
      <Link href="/Courses/1234/Assignments" passHref>
        <Button variant="secondary">Cancel</Button>
      </Link>
      <Link href="/Courses/1234/Assignments" passHref>
        <Button variant="danger">Save</Button>
      </Link>
      </div>
    </div>
    
  );}