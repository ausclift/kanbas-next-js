"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ params }: { params: { cid: string } }) {
  const pathname = usePathname();
  const { cid } = params;
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const gethref = (label: string) => {
    if (label === "People") return `/Courses/${cid}/People/Table`;
    return `/Courses/${cid}/${label}`;
  };
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = gethref(label);
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}>
            {label}
          </Link>
        );
      })}
    </div>
  );
}