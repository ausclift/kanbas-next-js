"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  const [showNav, setShowNav] = useState(true);
  const toggleNav = () => setShowNav(prev => !prev);
  if (!cid) return <div>Course ID not found</div>;

  return (
    <div id="wd-courses">
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
