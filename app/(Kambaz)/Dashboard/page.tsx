"use client";
import * as client from "../Courses/client";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { addEnrollment, removeEnrollment, setEnrollments } from "../Dashboard/reducer";
import { useState, useEffect } from "react";
import { FormControl, Card, CardBody, CardImg, CardText, CardTitle, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser) return null;
  const isFaculty = currentUser?.role === "FACULTY";
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer) as { enrollments: { _id: string; user: string; course: string }[] };
  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "Course Title",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "Course Description"
  });
  
  const isEnrolled = (courseId: string) =>
    enrollments.some(e => e.user === currentUser._id && e.course === courseId);

  const fetchCourses = async () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    if (newShowAll) await fetchAllCourses();
    else await fetchMyCourses();
  };

  const fetchMyCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await client.fetchEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(addNewCourse(newCourse));
    await fetchEnrollments();
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(deleteCourse(courseId));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(updateCourse(course));
  };

  const onEnroll = async (courseId: string) => {
    const newEnrollment = await client.enrollUser(courseId);
    dispatch(addEnrollment(newEnrollment));
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollUser(courseId);
    dispatch(removeEnrollment({ user: currentUser._id, course: courseId }));
  };

  useEffect(() => {
    if (!currentUser) router.replace("/Account/Signin");
    else fetchMyCourses(), fetchEnrollments();
  }, [currentUser]);

  return (
    <div className="mb-3 me-3 mt-3" id="wd-dashboard">
      <h1 id="wd-dashboard-title"> Dashboard </h1>
      <hr />

      {isFaculty && (
        <>
          <h5 className="mb-4">
            Create New Course
            <Button
              className="btn-success float-end"
              id="wd-add-course"
              onClick={onAddNewCourse}> Add </Button>
            {course._id !== "0" && (
            <Button
              className="btn-warning float-end me-3"
              id="wd-update-course"
              onClick={onUpdateCourse}> Update </Button>)}
          </h5>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl
            value={course.description}
            as="textarea" rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
        <Button
          className="btn-secondary float-end"
          id="wd-toggle-enrollments"
          onClick={() => fetchCourses()}> {showAll ? "My Courses" : "Enrollments"} </Button>
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <CardImg src={course.image || "/images/reactjs.jpg"} variant="top" width="100%" height={160} />
                <CardBody>
                  <CardTitle
                    className="wd-dashboard-course-title text-nowrap overflow-hidden"> {course.name} </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}> {course.description} </CardText>

                  {!showAll && (
                    <Button
                      className="primary"
                      id="wd-go-to-course"
                      onClick={() => router.push(`/Courses/${course._id}/Home`)}> Go </Button>
                  )}

                  {isFaculty && !showAll && (
                    <>
                      <Button 
                        className="btn-danger float-end"
                        id="wd-delete-course"
                        onClick={(event) => {event.preventDefault(); onDeleteCourse(course._id);}}> Delete </Button>
                      <Button
                        className="btn-warning me-2 float-end"
                        id="wd-edit-course"
                        onClick={() => setCourse(course)}> Edit </Button>
                    </>
                  )}

                  {showAll && isEnrolled(course._id) && (
                    <Button
                      className="btn-danger"
                      id="wd-remove-enrollment"
                      onClick={() => onUnenroll(course._id)}> Unenroll </Button>
                  )}

                  {showAll && !isEnrolled(course._id) && (
                    <Button
                      className="btn-success"
                      id="wd-add-enrollment"
                      onClick={() => onEnroll(course._id)}> Enroll </Button>
                  )}

                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
