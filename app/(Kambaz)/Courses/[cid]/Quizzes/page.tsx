"use client";
import * as client from "./client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import QuizControlButtons from "./QuizControlButtons";
import { BsGripVertical, BsFillCaretDownFill, BsRocketTakeoff } from "react-icons/bs";
import QuizControls from "./QuizControls";
import { deleteQuiz, setQuizzes } from "./reducer";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import SymbolPublished from "./SymbolPublished";
import SymbolUnpublished from "./SymbolUnpublished";

export default function Quizzes() {
  const router = useRouter();
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  if (!courseId) return <div>Course ID not found</div>;

  const togglePublished = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(courseId, updatedQuiz);
    const newQuizzes = quizzes.map((q: any) =>
      q._id === quiz._id ? updatedQuiz : q
    );
    dispatch(setQuizzes(newQuizzes));
  };

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "No Due Date";
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(courseId);
    dispatch(setQuizzes(quizzes));
  };

  const onRemoveQuiz = async (quizId: string) => {
    await client.deleteQuiz(courseId, quizId);
    dispatch(deleteQuiz(quizId));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);
  
  return (
    <div>
      {isFaculty && <QuizControls cid={ courseId } />}<br />
      <ListGroup className="rounded-0" id="wd-modules">

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsFillCaretDownFill className="me-1 fs-6" /> Assignment Quizzes
          </div>

          <ListGroup className="wd-lessons rounded-0">
          {quizzes.filter((quiz: any) => isFaculty || quiz.published)
            .map((quiz: any) => (
            <ListGroupItem
              key={quiz._id}
              className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                <BsGripVertical className="fs-3" />
              </div>
              <div className="d-flex align-items-center me-3">
                <BsRocketTakeoff className="fs-3 text-success" />
              </div>
              <div className="flex-grow-1 clickable-div"
                onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quiz._id}`)}>
                {quiz.title}
                <div className="fs-6">
                  {(() => {
                    const now = new Date();
                    const availableDate = new Date(quiz.available_date);
                    const untilDate = new Date(quiz.until_date);
                    if (now < availableDate) {
                      return (
                        <>
                          <span className="fw-bold"> Not available until </span>
                          <span> {formatDateTime(quiz.available_date)} </span>
                        </>
                      );
                    } else if (now > untilDate) {
                      return <span className="fw-bold"> Closed </span>;
                    } else {
                      return <span className="fw-bold"> Available </span>;
                    }
                  })()} |
                  <span className="fw-bold"> Due </span>
                  {formatDateTime(quiz.due_date)} | {quiz.questions?.length || 0} questions | {quiz.points} pts

                </div>
              </div>
              {isFaculty && <div className="ms-3">
                <span onClick={() => togglePublished(quiz)}>
                  {quiz.published ? <SymbolPublished /> : <SymbolUnpublished />}
                </span>
                <QuizControlButtons
                      quizId={quiz._id}
                      deleteQuiz={(quizId) => onRemoveQuiz(quizId)}
                      cid={ courseId }/>
              </div>}
            </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>

      </ListGroup>
    </div>
);}
