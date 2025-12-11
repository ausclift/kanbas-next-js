"use client";
import { FormControl, FormSelect, FormCheck, FormLabel, Row, Col, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../client";
import { useEffect } from "react";
import { setQuizzes } from "../../reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const dispatch = useDispatch();
  if (!courseId) return <div>Course ID not found</div>;
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes ?? []);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("");
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockAfterAnswering, setLockAfterAnswering] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  useEffect(() => {
    if (quizzes.length === 0) {
      client.findQuizzesForCourse(courseId).then((fetchedQuizzes) => {
        dispatch(setQuizzes(fetchedQuizzes));
      });
    }
  }, [courseId, quizzes.length, dispatch]);

  useEffect(() => {
    if (!quiz) return;
    setTitle(quiz.title);
    setDescription(quiz.description);
    setQuizType(quiz.quiz_type);
    setAssignmentGroup(quiz.assignment_group);
    setShuffleAnswers(quiz.shuffle_answers);
    setTimeLimit(quiz.time_limit);
    setMultipleAttempts(quiz.multiple_attempts);
    setShowCorrectAnswers(quiz.show_correct_answers);
    setOneQuestionAtATime(quiz.one_question_at_a_time);
    setWebcamRequired(quiz.webcam_required);
    setLockAfterAnswering(quiz.lock_after_answering);
    setDueDate(quiz.due_date?.split("T")[0] ?? "");
    setAvailableFrom(quiz.available_date?.split("T")[0] ?? "");
    setAvailableUntil(quiz.until_date?.split("T")[0] ?? "");
  }, [quiz]);

  const onUpdateQuiz = async (quiz: any) => {
    await client.updateQuiz(courseId, quiz);
  };

  const saveQuiz = async (published: boolean) => {
    if (!quiz) return;
    const payload = {
      _id: qid,
      title,
      description,
      quiz_type: quizType,
      points: 0,
      assignment_group: assignmentGroup,
      shuffle_answers: shuffleAnswers,
      time_limit: timeLimit,
      multiple_attempts: multipleAttempts,
      show_correct_answers: showCorrectAnswers,
      access_code: "",
      one_question_at_a_time: oneQuestionAtATime,
      webcam_required: webcamRequired,
      lock_after_answering: lockAfterAnswering,
      due_date: dueDate,
      available_date: availableFrom,
      until_date: availableUntil,
      published,
      course: cid,
    };

    await onUpdateQuiz(payload);
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (!quiz) return <div>Please refresh...</div>;
  
  return (
    <div id="wd-quiz-editor">
      <FormControl
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
        placeholder="Quiz name"/>

      <FormLabel>Instructions</FormLabel>
      <FormControl
        as="textarea"
        style={{ height: "200px" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3"/>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">Quiz Type</FormLabel>
        <Col sm="9">
          <FormSelect value={quizType} onChange={(e) => setQuizType(e.target.value)}>
            <option value="GRADED QUIZ">Graded Quiz</option>
            <option value="PRACTICE QUIZ">Practice Quiz</option>
            <option value="GRADED SURVEY">Graded Survey</option>
            <option value="UNGRADED SURVEY">Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">Assignment Group</FormLabel>
        <Col sm="9">
          <FormSelect value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
            <option value="QUIZ">QUIZ</option>
            <option value="ASSIGNMENT">ASSIGNMENT</option>
            <option value="EXAM">EXAM</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">Time Limit</FormLabel>
        <Col sm="9">
          <FormControl
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
          />
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">Options</FormLabel>
          <Col sm="9">
          <div className="p-3 border rounded">
            <FormCheck
              className="mb-2"
              label="Shuffle Answers"
              checked={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.checked)}/>
            <FormCheck
              className="mb-2"
              label="Allow Multiple Attempts"
              checked={multipleAttempts}
              onChange={(e) => setMultipleAttempts(e.target.checked)}/>
            <FormCheck
              className="mb-2"
              label="One Question at a Time"
              checked={oneQuestionAtATime}
              onChange={(e) => setOneQuestionAtATime(e.target.checked)}/>
            <FormCheck
              className="mb-2"
              label="Require Webcam"
              checked={webcamRequired}
              onChange={(e) => setWebcamRequired(e.target.checked)}/>
            <FormCheck
              label="Lock Questions After Answering"
              checked={lockAfterAnswering}
              onChange={(e) => setLockAfterAnswering(e.target.checked)}/>
            </div>
        </Col>
      </Row>

      <Row className="mb-3 align-items-start">
        <FormLabel column sm="3" className="text-sm-end">
          Assign
        </FormLabel>
        <Col sm="9">
          <div className="p-3 border rounded">
            <FormLabel className="d-block mb-3 fw-bold">Assign to</FormLabel>
            <FormControl value="Everyone" id="wd-assign-to" className="mb-3" readOnly />
            <FormLabel className="d-block mb-3 fw-bold">Due</FormLabel>
            <FormControl
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mb-3"
              id="wd-due-date"/>
            <Row className="mb-3">
              <Col>
                <FormLabel className="mb-3 fw-bold">Available from</FormLabel>
                <FormControl
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  id="wd-available-from"/>
              </Col>
              <Col>
                <FormLabel className="mb-3 fw-bold">Until</FormLabel>
                <FormControl
                  type="date"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  id="wd-available-until"/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="btn-secondary me-3" onClick={() => router.push(`/Courses/${cid}/Quizzes`)}>
          Cancel
        </Button>
        <Button className="btn-success me-3" onClick={() => saveQuiz(false)}>
          Save
        </Button>
        <Button className="btn-danger" onClick={() => saveQuiz(true)}>
          Save and Publish
        </Button>
      </div>
    </div>
  );
}
