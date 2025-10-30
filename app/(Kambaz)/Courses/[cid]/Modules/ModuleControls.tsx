import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react"; 
export default function ModulesControls(
{ moduleName, setModuleName, addModule }:
{ moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
  return (
<div id="wd-modules-controls"
  className="d-flex flex-wrap justify-content-end align-items-center gap-1">
  <Button variant="danger" size="lg" id="wd-add-module-btn" onClick={handleShow}>
    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
    Module
  </Button>

  <Dropdown>
    <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
      <GreenCheckmark /> Publish All
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem id="wd-publish-all">
        <GreenCheckmark /> Publish All
      </DropdownItem>
      <DropdownItem id="wd-publish-all-modules-and-items">
        <GreenCheckmark /> Publish all modules and items
      </DropdownItem>
      <DropdownItem id="wd-publish-modules-only">
        <GreenCheckmark /> Publish modules only
      </DropdownItem>
      <DropdownItem id="wd-unpublish-all-modules-and-items">
        <MdDoNotDisturbAlt className="fs-5" /> Unpublish all
      </DropdownItem>
      <DropdownItem id="wd-unpublish-modules-only">
        <MdDoNotDisturbAlt className="fs-5" /> Unpublish modules only
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>

  <Button variant="secondary" size="lg" id="wd-view-progress">
    View Progress
  </Button>
  <Button variant="secondary" size="lg" id="wd-collapse-all">
    Collapse All
  </Button>
  <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
</div>
);}
