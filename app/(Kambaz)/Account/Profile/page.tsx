"use client";
import * as client from "../client";
import { redirect } from "next/dist/client/components/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormGroup, FormLabel, FormSelect, InputGroup } from "react-bootstrap";
export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
      await client.signout();
      dispatch(setCurrentUser(null));
      redirect("/Account/Signin");
    };
  const updateProfile = async () => {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
    };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="wd-profile-screen">
     <h3>Profile</h3>
     {profile && (
       <div>
        <FormGroup className="mb-2" controlId="wd-username">
          <FormLabel>Username:</FormLabel>
          <FormControl
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
        </FormGroup>

        <FormGroup className="mb-2" controlId="wd-password">
        <FormLabel>Password:</FormLabel>
        <InputGroup>
          <FormControl
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"/>
          <Button
            variant="outline-link"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
            title={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup>
        </FormGroup>

        <FormGroup className="mb-2" controlId="wd-firstname">
          <FormLabel>First Name:</FormLabel>
          <FormControl
            defaultValue={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
        </FormGroup>

        <FormGroup className="mb-2" controlId="wd-lastname">
          <FormLabel>Last Name:</FormLabel>
          <FormControl
            defaultValue={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
        </FormGroup>

        <FormGroup className="mb-2" controlId="wd-dob">
          <FormLabel>Date of Birth:</FormLabel>
          <FormControl
            type="date"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
        </FormGroup>

        <FormGroup className="mb-2" controlId="wd-email">
          <FormLabel>Email:</FormLabel>
          <FormControl
            type="email"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
        </FormGroup>

        <FormGroup className="mb-2" controlId="wd-role">
          <FormLabel>Role:</FormLabel>
          <FormSelect
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
        </FormGroup>

        <Button onClick={updateProfile} className="w-100 mb-2" id="wd-updateprofile-btn"> Update </Button>
        <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn"> Sign out </Button>
      </div>
    )}
  </div>
);}
