"use client";
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../client";

export default function People() {
  const params = useParams();
  const courseId = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const [name, setName] = useState("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const filterUsersByName = (search: string, list: any[] = allUsers) => {
    const regex = new RegExp(search, "i");
    const filtered = list.filter(
      (user) => regex.test(user.firstName) || regex.test(user.lastName));
    setFilteredUsers(filtered);
  };

  const fetchUsersForCourse = async () => {
    if (!courseId) return;
    const users = await client.findUsersForCourse(courseId);
    setAllUsers(users);
    console.log("Loaded users:", users);
    console.log("Search term:", name, "Filtered:", filteredUsers.length)
    filterUsersByName(name, users);
  };

  useEffect(() => {
    fetchUsersForCourse();
  }, [courseId]);

  return (
    <div>
      <h3>People</h3>

      <FormControl
        placeholder="Search People"
        className="float-start w-25 me-2 wd-filter-by-name"
        value={name}
        onChange={(e) => {
          const newName = e.target.value;
          setName(newName);
          filterUsersByName(newName);
        }}/>

      <PeopleTable users={filteredUsers} fetchUsers={fetchUsersForCourse}
      />
    </div>
  );
}
