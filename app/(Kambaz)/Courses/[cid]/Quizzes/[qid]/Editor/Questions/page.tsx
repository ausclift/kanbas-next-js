"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, addQuestionLocal, updateQuestionLocal, deleteQuestionLocal} from "../reducer";
import { findQuestionsForQuiz, createQuestionForQuiz, updateQuestion, deleteQuestion} from "../../../client";
import { Button, FormControl, FormSelect, Row, Col, FormLabel} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
export default function QuestionsPage() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const quizId = Array.isArray(qid) ? qid[0] : qid;
  const questions = useSelector((state: any) => state.questionsReducer?.questions ?? []);
  const [editing, setEditing] = useState<Record<string, any>>({});
  if (!courseId || !quizId) return <div>Missing Course or Quiz</div>;

  const loadQuestions = async () => {
    const data = await findQuestionsForQuiz(courseId, quizId);
    dispatch(setQuestions(data));
  };

  useEffect(() => {
    loadQuestions();
  }, [courseId, quizId]);

  const startEditing = (q: any, isNew = false) => {
    setEditing((prev) => ({
      ...prev,
      [q._id]: { ...q, isNew }
    }));
  };

  const updateLocal = (id: string, updated: any) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updated }
    }));
  };

  const cancelEdit = async (id: string) => {
    const isNew = editing[id]?.isNew;
    if (isNew) {
      dispatch(deleteQuestionLocal(id));
    }
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const saveEdit = async (id: string) => {
    const q = editing[id];
    const isNew = q.isNew;
    const clean = { ...q };
    delete clean.isNew;
    if (isNew) {
      const saved = await createQuestionForQuiz(courseId, quizId, clean);
      dispatch(deleteQuestionLocal(q._id));
      dispatch(addQuestionLocal(saved));
    } else {
      const saved = await updateQuestion(courseId, quizId, clean);
      dispatch(updateQuestionLocal(saved));
    }
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const addNewQuestion = async () => {
    const tempId = uuidv4();
    const newQ = {
      _id: tempId,
      type: "Multiple Choice",
      prompt: "",
      options: ["", ""],
      correct_option: null,
      correct_answer_tf: true,
      correct_answer_text: [""],
      points: 1
    };
    dispatch(addQuestionLocal(newQ));
    startEditing(newQ, true);
  };

  const isValid = (q: any): boolean => {
    if (!q.prompt?.trim()) return false;
    if (q.type === "Multiple Choice") {
      if (!q.options || q.options.length < 2) return false;
      if (q.options.some((o: string) => !o.trim())) return false;
      if (q.correct_option === null || q.correct_option === undefined) return false;
    }
    if (q.type === "Fill in the Blank") {
      if (!q.correct_answer_text || q.correct_answer_text.some((t: string) => !t.trim()))
        return false;
    }
    return true;
  };

  const removeQuestion = async (id: string) => {
    await deleteQuestion(courseId, quizId, id);
    dispatch(deleteQuestionLocal(id));
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end mb-3 me-3">
        <h5>{questions.reduce((sum: number, q: { points: number }) => sum + (q.points || 0), 0)} Points </h5>
      </div>
      
      <div className="d-flex justify-content-center mb-4">
        <Button className="btn-lg btn-secondary" onClick={addNewQuestion}>
          + New Question
        </Button>
      </div>

      {questions.map((q: any) => {
        const isEdit = Boolean(editing[q._id]);
        const temp = editing[q._id];

        return (
          <div key={q._id} className="border p-3 mb-3 rounded">
            {!isEdit && (
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{q.type}</strong>
                  <div className="mt-2">{q.prompt}</div>
                </div>

                <div className="ps-4 d-flex flex-column align-items-center">
                <Button
                  className="btn-sm btn-secondary mb-2 w-100"
                  onClick={() => startEditing(q)}>
                  Edit
                </Button>
                <Button
                  className="btn-sm btn-danger w-100"
                  onClick={() => removeQuestion(q._id)}>
                  Delete
                </Button>
              </div>
              </div>
            )}

            {isEdit && (
              <>
                <Row className="mb-3 align-items-center">
                  <Col sm={3}>
                    <FormSelect
                      value={temp.type}
                      onChange={(e) => updateLocal(q._id, { type: e.target.value })}>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="True or False">True or False</option>
                      <option value="Fill in the Blank">Fill in the Blank</option>
                    </FormSelect>
                  </Col>

                  <Col className="d-flex justify-content-end align-items-center">
                    <FormLabel className="me-2 mb-0">pts:</FormLabel>
                    <FormControl
                      type="number"
                      style={{ width: "80px" }}
                      value={temp.points || 0}
                      onChange={(e) =>
                        updateLocal(q._id, { points: Number(e.target.value) })
                      }/>
                  </Col>
                </Row>
                <FormLabel className="fs-5">Question:</FormLabel>
                <FormControl
                  className="mb-3"
                  as="textarea"
                  style={{ height: "100px" }}
                  value={temp.prompt}
                  onChange={(e) => updateLocal(q._id, { prompt: e.target.value })}/>

                {temp.type === "Multiple Choice" &&
                  temp.options?.map((opt: string, i: number) => (
                    <Row className="mb-2 align-items-center" key={i}>
                      <Col className="d-flex justify-content-end" sm={3}>
                        <FormLabel className="mb-0">Option {i + 1}</FormLabel>
                      </Col>
                      <Col sm={6}>
                        <FormControl
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...temp.options];
                            newOpts[i] = e.target.value;
                            updateLocal(q._id, { options: newOpts });
                          }}/>
                      </Col>
                      <Col sm={3}>
                        <FaTrash
                          className={temp.options.length <= 2 ? "text-muted" : "text-danger"}
                          onClick={() => {
                            if (temp.options.length <= 2) return;
                            const newOpts = temp.options.filter((_: any, idx: number) => idx !== i);
                            let corrected = temp.correct_option;
                            if (corrected === i) corrected = null;
                            else if (corrected !== null && corrected > i) corrected--;
                            updateLocal(q._id, {options: newOpts, correct_option: corrected});
                          }}/>
                      </Col>
                    </Row>
                  ))}
                {temp.type === "Multiple Choice" && (
                  <div className="d-flex justify-content-end mb-2">
                    <span className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() =>updateLocal(q._id, { options: [...temp.options, ""] })}>
                      + Add Another Answer
                    </span>
                  </div>
                )}
                {temp.type === "Multiple Choice" && (
                  <Row className="mb-2">
                    <Col className="d-flex justify-content-end align-items-center" sm={3}>
                      <FormLabel className="mb-0">Solution</FormLabel>
                    </Col>
                    <Col sm={6}>
                      <FormSelect
                        value={temp.correct_option ?? ""}
                        onChange={(e) => updateLocal(q._id, { correct_option: Number(e.target.value)})}>
                        <option value="">Select the solution</option>
                        {temp.options.map((opt: string, i: number) => (
                          <option key={i} value={i}>
                            {opt || `Option ${i + 1}`}
                          </option>
                        ))}
                      </FormSelect>
                    </Col>
                  </Row>
                )}

                {temp.type === "True or False" && (
                  <Row className="mb-2">
                    <Col className="d-flex justify-content-end align-items-center" sm={3}>
                      <FormLabel className="mb-0">Solution</FormLabel>
                    </Col>
                    <Col sm={9}>
                      <FormSelect
                        value={temp.correct_answer_tf ? "true" : "false"}
                        onChange={(e) => updateLocal(q._id, {correct_answer_tf: e.target.value === "true"})}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </FormSelect>
                    </Col>
                  </Row>
                )}

                {temp.type === "Fill in the Blank" &&
                  temp.correct_answer_text?.map((ans: string, i: number) => (
                    <Row className="mb-2 align-items-center" key={i}>
                      <Col className="d-flex justify-content-end" sm={3}>
                        <FormLabel className="mb-0">Solution {i + 1}</FormLabel>
                      </Col>
                      <Col sm={6}>
                        <FormControl
                          value={ans}
                          onChange={(e) => {
                            const newArr = [...temp.correct_answer_text];
                            newArr[i] = e.target.value;
                            updateLocal(q._id, { correct_answer_text: newArr });
                          }}/>
                      </Col>

                      <Col sm={3}>
                        <FaTrash
                          className={temp.correct_answer_text.length <= 1 ? "text-muted" : "text-danger"}
                          onClick={() => {
                            if (temp.correct_answer_text.length <= 1) return;
                            const newArr = temp.correct_answer_text.filter((_: any, idx: number) => idx !== i);
                            updateLocal(q._id, { correct_answer_text: newArr });
                          }}/>
                      </Col>
                    </Row>
                  ))}

                {temp.type === "Fill in the Blank" && (
                  <div className="d-flex justify-content-end mb-2">
                    <span
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => updateLocal(q._id, {correct_answer_text: [...temp.correct_answer_text, ""]})}>
                      + Add Another Answer
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-start mt-3">
                  <Button className="btn-secondary me-3" onClick={() => cancelEdit(q._id)}>
                    Cancel
                  </Button>
                  <Button className="btn-danger"
                    disabled={!isValid(temp)}
                    onClick={() => saveEdit(q._id)}>
                    Update Question
                  </Button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
