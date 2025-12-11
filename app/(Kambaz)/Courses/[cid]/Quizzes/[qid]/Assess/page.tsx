"use client";
import { useEffect, useState } from "react";
import { Button, FormControl, FormCheck, Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../../client";
import { setQuizzes } from "../../reducer";


export default function TakeQuizPage() {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser) return router.push(`/Account/Signin`);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  const { cid, qid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  if (!courseId || !quizId) return <div>Course ID not found</div>;

  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes?.find((q: any) => q._id === quizId);

  useEffect(() => {
    if (!quiz) {
      const fetch = async () => {
        const quizzes = await client.findQuizzesForCourse(courseId);
        dispatch(setQuizzes(quizzes));
      };
      fetch();
    }
  }, [courseId, quiz, dispatch]);

  useEffect(() => {
    if (quiz) {
      const fetchQuestions = async () => {
        const data = await client.findQuestionsForQuiz(courseId, quizId);
        setQuestions(data);
      };
      fetchQuestions();
    }
  }, [quiz, courseId, quizId]);

  if (!quiz || questions.length === 0) {
    return(<>Loading...</>)
  }
  const current = questions[index];

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  };

  const updateAnswer = (qid: string, value: any) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => {
      setSubmitted(true);
  };

  const renderQuestion = (q: any) => {
    const ans = answers[q._id];
    switch (q.type) {
      case "Multiple Choice":
        return (
          <>
            {q.options.map((opt: string, i: number) => (
              <>
              <hr className="mt-2 mb-2"/>
              <FormCheck
                type="radio"
                key={i}
                id={`${q._id}-${i}`}
                name={q._id}
                label={opt}
                value={i}
                checked={ans === i}
                onChange={() => updateAnswer(q._id, i)}
                className="mb-2"/>
              </>
            ))}
          </>
        );
      case "True or False":
        return (
          <>
            <hr className="mt-2 mb-2"/>
            <FormCheck
              type="radio"
              id={`${q._id}-true`}
              name={q._id}
              label="True"
              value="true"
              checked={ans === true}
              onChange={() => updateAnswer(q._id, true)}
              className="mb-2"/>
            <hr className="mt-2 mb-2"/>
            <FormCheck
              type="radio"
              id={`${q._id}-false`}
              name={q._id}
              label="False"
              value="false"
              checked={ans === false}
              onChange={() => updateAnswer(q._id, false)}
              className="mb-2"/>
          </>
        );
      case "Fill in the Blank":
        return (
          <>
            <hr className="mt-2 mb-2"/>
            <FormControl type="text" value={ans ?? ""} onChange={(e) => updateAnswer(q._id, e.target.value)} />
          </>
        );
    }
  };

  if (submitted) {
    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

    let earnedPoints = 0;
    questions.forEach((q) => {
      const ans = answers[q._id];
      let correct = false;

      switch (q.type) {
        case "Multiple Choice":
          correct = ans === q.correct_option;
          break;
        case "True or False":
          correct = ans === q.correct_answer_tf;
          break;
        case "Fill in the Blank":
          correct = q.correct_answer_text.some(
            (text: string) => text.trim().toLowerCase() === (ans ?? "").trim().toLowerCase()
          );
          break;
      }

      if (correct) earnedPoints += q.points || 0;
    }
  );

  const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  const renderAnswer = (q: any, ans: any) => {
    switch (q.type) {
      case "Multiple Choice":
        return (
          <>
            {q.options.map((opt: string, i: number) => {
              const isCorrect = i === q.correct_option;
              const isSelected = ans === i;
              const variantClass =
                isSelected && isCorrect
                  ? "border border-2 border-success rounded p-1 ms-3"
                  : isSelected && !isCorrect
                  ? "border border-2 border-danger rounded p-1 ms-3"
                  : isCorrect
                  ? "border border-2 border-success rounded p-1 ms-3"
                  : "rounded p-1 ms-3";
              return (
                <FormCheck
                  type="radio"
                  key={i}
                  id={`${q._id}-${i}`}
                  name={q._id}
                  label={opt}
                  checked={isSelected}
                  readOnly
                  className={`mb-2 ${variantClass}`}/>
              );
            })}
          </>
        );

      case "True or False":
        return ["true", "false"].map((val) => {
          const boolVal = val === "true";
          const isCorrect = boolVal === q.correct_answer_tf;
          const isSelected = ans === boolVal;
          const variantClass =
            isSelected && isCorrect
              ? "border border-2 border-success rounded p-1 ms-3"
              : isSelected && !isCorrect
              ? "border border-2 border-danger rounded p-1 ms-3"
              : isCorrect
              ? "border border-2 border-success rounded p-1 ms-3"
              : "rounded p-1 ms-3";
          return (
            <FormCheck
              key={val}
              type="radio"
              id={`${q._id}-${val}`}
              name={q._id}
              label={val.charAt(0).toUpperCase() + val.slice(1)}
              checked={isSelected}
              readOnly
              className={`mb-2 ${variantClass}`}
            />
          );
        });

      case "Fill in the Blank":
        const isCorrect = q.correct_answer_text.some(
          (text: string) => text.trim().toLowerCase() === (ans ?? "").trim().toLowerCase()
        );
        return (
          <div>
            <FormControl
              type="text"
              value={ans ?? ""}
              readOnly
              className={isCorrect ? "border-2 border-success mb-2" : "border-2 border-danger mb-2"}/>
            <div>
              Valid Responses:
              <div className="ms-3 text-success">
                {q.correct_answer_text.join(", ")}
              </div>
            </div>
          </div>
        );

        }
      };

      return (
        <div className="p-4">
          <h2 className="mb-2">{quiz.title}</h2>
          <p className="mb-4">{quiz.description}</p>
          <hr className="mb-2"/>
          <div className="d-flex justify-content-between">
            <span className="mb-3 mt-3 fs-4 text-center">Quiz Preview Complete</span>
            <span className="mb-3 mt-3 fs-4 text-center">Score: {earnedPoints} / {totalPoints} ({scorePercent}%)</span>
          </div>
          {questions.map((q, i) => (
            <div key={q._id} className="mb-4 border rounded">
              <div className="d-flex justify-content-between p-3 bg-light rounded-top">
                <span className="fs-5 fw-bold">Question {i + 1}</span>
                <span className="fs-5">{q.points} pts</span>
              </div>
              <div className="border-top p-4 rounded-bottom">
                <div>{q.prompt}</div>
                <div className="mt-3">{renderAnswer(q, answers[q._id])}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }

  return (
    <div className="p-4">
      <h2 className="mb-2">{quiz.title}</h2>
      <p className="mb-4">{quiz.description}</p>
      <hr className="mb-2"/>
      <Row className="py-1">
        <Col sm={3} className="text-start fw-bold">Due</Col>
        <Col sm={3} className="text-start fw-bold">Available from</Col>
        <Col sm={3} className="text-start fw-bold">Until</Col>
      </Row>
      <Row className="py-1">
        <Col sm={3} className="text-start">{formatDateTime(quiz.due_date)}</Col>
        <Col sm={3} className="text-start">{formatDateTime(quiz.available_date)}</Col>
        <Col sm={3} className="text-start">{formatDateTime(quiz.until_date)}</Col>
      </Row>
      <hr className="mt-2"/>
        <div className="border d-flex justify-content-between p-3 bg-light rounded-top">
          <span className="fs-5 fw-bold">Question {index + 1}</span>
          <span className="fs-5">{current.points} pts</span>
        </div>
        <div className="border-bottom border-start border-end p-4 mb-4 rounded-bottom">
          {current.prompt}
          <div className="mt-4">{renderQuestion(current)}</div>
        </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Previous
        </Button>
        <div className="fw-bold">{index + 1} / {questions.length}</div>
        <Button variant="secondary" disabled={index === questions.length - 1} onClick={() => setIndex(index + 1)}>
          Next
        </Button>
      </div>
      <hr className="my-3" />
      <div className="d-flex justify-content-end">
        <Button variant="danger" size="lg" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
