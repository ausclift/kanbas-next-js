"use client";
import { useParams } from "next/navigation";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as client from "../client";
import { setQuizzes } from "../reducer";
import { useRouter } from "next/navigation";

export default function QuizDetailsPage() {
  const router = useRouter();
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  if (!courseId) return <div>Course ID not found</div>;
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser) return router.push(`/Account/Signin`);
  const isFaculty = currentUser?.role === "FACULTY";

  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const quiz = quizzes.find((q: any) => q._id === quizId);

  useEffect(() => {
    if (!quiz) {
      const fetch = async () => {
        const quizzes = await client.findQuizzesForCourse(courseId);
        dispatch(setQuizzes(quizzes));
      };
      fetch();
    }
  }, [courseId, quiz, dispatch]);

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };

  const loading = quizzes.length === 0;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="mb-4">{quiz.title}</h2>
      {quiz.description}

      {isFaculty && <div className="mt-3">
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Quiz Type</Col>
          <Col sm={3} className="text-start">{quiz.quiz_type}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Points</Col>
          <Col sm={3} className="text-start">{quiz.points}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Assignment Group</Col>
          <Col sm={9} className="text-start">{quiz.assignment_group}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Shuffle Answers</Col>
          <Col sm={9} className="text-start">{quiz.shuffle_answers ? "Yes" : "No"}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Time Limit</Col>
          <Col sm={9} className="text-start">{quiz.time_limit} Minutes</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Multiple Attempts</Col>
          <Col sm={9} className="text-start">{quiz.multiple_attempts ? "Yes" : "No"}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Show Correct Answers</Col>
          <Col sm={9} className="text-start">{quiz.show_correct_answers ? "Yes" : "No"}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Access Code</Col>
          <Col sm={9} className="text-start">{quiz.access_code}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">One Question at a Time</Col>
          <Col sm={9} className="text-start">{quiz.one_question_at_a_time ? "Yes" : "No"}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Webcam Required</Col>
          <Col sm={9} className="text-start">{quiz.webcam_required ? "Yes" : "No"}</Col>
        </Row>
        <Row className="py-1">
          <Col sm={3} className="text-end fw-bold">Lock Questions After Answering</Col>
          <Col sm={9} className="text-start">{quiz.lock_after_answering ? "Yes" : "No"}</Col>
        </Row>
      </div>}
        
        <Row className="mt-4 py-1">
          <Col sm={3} className="text-start fw-bold">Due</Col>
          <Col sm={3} className="text-start fw-bold">Available from</Col>
          <Col sm={3} className="text-start fw-bold">Until</Col>
        </Row>
        <hr className="mt-1 mb-2"/>
        <Row className="py-1">
          <Col sm={3} className="text-start">{formatDateTime(quiz.due_date)}</Col>
          <Col sm={3} className="text-start">{formatDateTime(quiz.available_date)}</Col>
          <Col sm={3} className="text-start">{formatDateTime(quiz.until_date)}</Col>
        </Row>
        <hr className="mt-2"/>

        {isFaculty &&
        <Button className="mt-3 me-3 btn-secondary"
          onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quiz._id}/Editor`)}>
          Edit
        </Button>}

        <Button
          className="mt-3 btn-danger"
          onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quiz._id}/Assess`)}
          disabled={(quiz.questions?.length ?? 0) < 1}>
          {isFaculty ? "Preview" : "Begin Quiz"}
        </Button>

        
    </div>
  );
}