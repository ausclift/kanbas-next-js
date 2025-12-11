import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import InputGroupText from 'react-bootstrap/InputGroupText';
import { useRouter } from "next/navigation";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";
export default function QuizControls({ cid }: { cid: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const onCreateQuizForCourse = async () => {
    const newQuiz = {
      title: "New Quiz",
      description: "",
      quiz_type: "GRADED QUIZ",
      points: 0,
      assignment_group: "QUIZ",
      shuffle_answers: true,
      time_limit: 20,
      multiple_attempts: false,
      show_correct_answers: "AFTER DUE DATE",
      access_code: "",
      one_question_at_a_time: true,
      webcam_required: false,
      lock_after_answering: false,
      due_date: "",
      available_date: "",
      until_date: "",
      published: false,
      course: cid,
    };
  const created = await client.createQuizForCourse(cid, newQuiz);
  dispatch(addQuiz(created));
  router.replace(`/Courses/${cid}/Quizzes/${created._id}/Editor`);
  };
  return (
    <div
      id="wd-modules-controls"
      className="d-flex flex-wrap justify-content-between align-items-center gap-2">
      <InputGroup style={{ minWidth: "300px", maxWidth: "50%" }}>
        <InputGroupText>
          <FaSearch />
        </InputGroupText>
        <FormControl
          placeholder="Search..."
          id="wd-search-quizzes"
          className="form-control-lg" />
      </InputGroup>

      <div className="d-flex gap-2 flex-wrap">
        <Button variant="danger" size="lg" id="wd-add-quiz-btn"
        onClick={() => {onCreateQuizForCourse()}}>
          <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
          Quiz
        </Button>
      </div>
    </div>
);}
