"use client";
import { useState } from "react";
import { FormControl, Card, CardBody, CardImg, CardText, CardTitle, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enroll, unenroll } from "../Dashboard/reducer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "Course Title", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "Course Description"
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [showAll, setShowAll] = useState(false);
  const isEnrolled = (courseId: string) => enrollments.some(
    (e: any) => e.user === currentUser._id && e.course === courseId
  );
  useEffect(() => { if (!currentUser) router.replace("/Account/Signin"); }, [currentUser, router]);
  if (!currentUser) return null;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && <h5 className="mb-4">Create New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => dispatch(addNewCourse(course))} > Add </button>
          <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
          Update </button>
      </h5>}
      {isFaculty && <FormControl value={course.name} className="mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />}
      {isFaculty && <FormControl value={course.description} as="textarea" rows={3}
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />}
      {isFaculty && <hr />}
      <h2 id="wd-dashboard-published">Published Courses ({courses.filter((course: any) =>
          enrollments.some(
          (enrollment) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
          )).length})
          <Button className="btn-primary me-2 float-end" onClick={() => setShowAll(!showAll)}>
            {showAll ? "My Courses" : "Enrollments"} </Button>
          </h2><hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.filter((course: any) => showAll ? true: enrollments.some(
          (enrollment) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
  )
  .map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </CardText>
                    
                  {!showAll && <Button variant="primary"
                    onClick={() => router.push(`/Courses/${course._id}/Home`)}>
                    Go </Button>}

                  {isFaculty && !showAll && <Button onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(course._id));
                    }} className="btn-danger float-end"
                    id="wd-delete-course-click">
                    Delete
                  </Button>}

                  {isFaculty && !showAll && <Button id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}
                    className="btn-warning me-2 float-end" >
                    Edit
                  </Button>}

                  {showAll && isEnrolled(course._id) && <Button className="btn-danger"
                    onClick={() =>
                    dispatch(unenroll({ user: currentUser._id, course: course._id }))}>
                    Unenroll
                  </Button>}

                  {showAll && !isEnrolled(course._id) && <Button className="btn-success"
                    onClick={() =>
                    dispatch(enroll({ user: currentUser._id, course: course._id }))}>
                    Enroll
                  </Button>}
                  
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);}

