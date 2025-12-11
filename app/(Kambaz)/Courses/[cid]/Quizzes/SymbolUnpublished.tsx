import { BsSlashCircleFill } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
export default function SymbolUnpublished() {
  return (
    <span className="me-1 position-relative">
      <BsSlashCircleFill style={{ top: "2px" }} className="text-danger me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>);}