"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  const { aid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const assignment = assignments.find((a: any) => a._id === aid);
  const lastSegment = assignment ? assignment.title : pathname.split("/").pop();

  return (
    <span>
      {course?.name} &gt; {lastSegment}
    </span>
  );
}