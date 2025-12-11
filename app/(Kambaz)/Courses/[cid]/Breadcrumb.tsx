"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import { useSelector } from "react-redux";
export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  const { aid, qid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const assignment = assignments.find((a: any) => a._id === aid);
  const quiz = quizzes.find((q: any) => q._id === qid);

  let lastSegment = pathname.split("/").pop();

  if (assignment) lastSegment = assignment.title;
  else if (quiz) lastSegment = quiz.title;

  return (
    <span>
      {course?.name} &gt; {lastSegment}
    </span>
  );
}
