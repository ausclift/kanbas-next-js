import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";

type CoursesLayoutProps = {
  children: ReactNode;
  params: { cid: string };
};

export default async function CoursesLayout({ children, params }: CoursesLayoutProps) {
  const { cid } = params;
  const course = await new Promise<typeof courses[0] | undefined>((resolve) => {
    setTimeout(() => resolve(courses.find((c) => c._id === cid)), 50);
  });
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
