import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";

type CoursesLayoutProps = {
  children: ReactNode;
  params: { cid: string };
};

export default async function CoursesLayout(props: any) {
  const { children, params } = props as { children: ReactNode; params: { cid: string } };
  const { cid } = params;

  const course = await Promise.resolve(courses.find(c => c._id === cid));

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          <Breadcrumb course={course} /> </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation params={{ cid }} />
        </div>
        <div className="flex-fill">
          {children}
        </div></div>
    </div>
);}
