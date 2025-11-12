import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import InputGroupText from 'react-bootstrap/InputGroupText';
import { useRouter } from "next/navigation";
export default function AssignmentControls({ cid }: { cid: string }) {
  const router = useRouter();
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
          id="wd-search-assignments"
          className="form-control-lg" />
      </InputGroup>

      <div className="d-flex gap-2 flex-wrap">
        <Button variant="danger" size="lg" id="wd-add-assignment-btn"
        onClick={() => {
          router.push(`/Courses/${cid}/Assignments/New`)}}>
          <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
          Assignment
        </Button>
        <Button variant="secondary" size="lg" id="wd-add-group-btn">
          <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
          Group
        </Button>
      </div>
    </div>
);}
