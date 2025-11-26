"use client";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const { uid } = useParams();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const fetchUsersByRole = async (role: string) => {
    let users;
    if (role) {
      users = await client.findUsersByRole(role);
    } else {
      users = await client.findAllUsers();
    }
    setAllUsers(users);
    filterUsersByName(name, users);
  };

  const filterUsersByName = (name: string, usersList: any[] = allUsers) => {
    const regex = new RegExp(name, "i");
    const filtered = usersList.filter(
      (user) => regex.test(user.firstName) || regex.test(user.lastName)
    );
    setFilteredUsers(filtered);
  };

  const createUser = async () => {
    const today = new Date().toISOString().split("T")[0];
    await client.createUser({
      username: `newuser${Date.now()}`,
      password: "password123",
      firstName: "New",
      lastName: `User ${allUsers.length + 1}`,
      email: `email${allUsers.length + 1}@neu.edu`,
      dob: today,
      role: "STUDENT",
      loginId: "002143650S",
      section: "S101",
      lastActivity: today,
      totalActivity: "00:00:00"
    });
    fetchUsersByRole(role);
  };

  useEffect(() => {
    fetchUsersByRole(role);
  }, [role, uid]);

  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2 mb-1" />
        Users
      </button>
      <h3>Users</h3>
      <FormControl
        placeholder="Search Users"
        className="float-start w-25 me-2 wd-filter-by-name"
        value={name}
        onChange={(e) => {
          const newName = e.target.value;
          setName(newName);
          filterUsersByName(newName);
        }}/>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role">
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={filteredUsers} fetchUsers={() => fetchUsersByRole(role)} />
    </div>
  );
}
