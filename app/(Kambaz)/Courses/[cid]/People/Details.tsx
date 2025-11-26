import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../../Account/client";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<any>({});
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isAdmin = currentUser?.role === "ADMIN";

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  const deleteUser = async (uid: string) => {
    if (!isAdmin) return;
    await client.deleteUser(uid);
    onClose();
  };
  
  const saveUser = async () => {
    if (!isAdmin) return;
    const parts = name.trim().split(/\s+/);
    const newFirst = parts[0];
    const newLast = parts.slice(1).join(" ");
    const updatedUser = {...user, firstName: newFirst || user.firstName, lastName: newLast || user.lastName, role, email};
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  useEffect(() => {
    if (uid) {
      fetchUser();
      setEditing(false);
      setName("");
      setEmail("");
      setRole("");
    }
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />

      <div className="text-danger fs-4">

        {!editing && isAdmin && (
          <FaPencil onClick={() => {
            if (!isAdmin) return;
            setEditing(true);
            setName(`${user.firstName} ${user.lastName}`);
            setRole(user.role);
            setEmail(user.email);
          }}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && isAdmin && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}

        {!editing && (
          <div className="wd-name"
               onClick={() => {
                if (!isAdmin) return;
                setEditing(true);
              }}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && isAdmin && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}} />)}
              
      </div>
      
      {editing && isAdmin && (
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select mt-1">
          <option value="STUDENT">Student</option>
          <option value="TA">Assistant</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrator</option>
        </select>
      )}
      {!editing && (
        <div>
          <b> Role: </b> <span className="wd-roles"> {user.role} </span> <br />
        </div>
      )}
      
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />

      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />

      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> <br />

      {editing && isAdmin && (
        <FormControl className="wd-edit-email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)} />
      )}
      {!editing && (
        <div>
          <b> Email: </b> <span className="wd-email"> {user.email} </span>
        </div>
      )}

      <hr />
      <button onClick={onClose} className="btn btn-secondary float-end wd-cancel" > Cancel </button>
      {isAdmin && (
        <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end me-2 wd-delete"> Delete </button>
        )}
    </div>
  );
}
