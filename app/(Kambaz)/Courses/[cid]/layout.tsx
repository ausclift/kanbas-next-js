"use client";
import * as client from "../client";
import { ReactNode, useState, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { setCourses } from "../reducer";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);

  const [showNav, setShowNav] = useState(true);
  const toggleNav = () => setShowNav(prev => !prev);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      client.fetchAllCourses()
        .then(fetchedCourses => dispatch(setCourses(fetchedCourses)))
        .catch(err => console.error("Failed to fetch courses:", err));
    }
  }, [courses, dispatch]);

  const course = courses.find((c: any) => c._id === cid);

  if (!cid) return <div>Course ID not found</div>;
  if (!course) return <div>Loading course...</div>;

  return (
    <div id="wd-courses" className="mb-3 me-3 mt-3">
      <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1"
          onClick={toggleNav} />
          <Breadcrumb course={course} /> </h2> <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block me-3">
            <CourseNavigation params={{ cid: cid as string }} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
);}
