"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
 const pathname = usePathname();
 const isActive = (path: string) => pathname.startsWith(path);
 return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }} id="wd-kambaz-navigation">

      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link">
        <img
          src="/images/NU-notched.png" width="75px" alt="Northeastern University"/>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${isActive("/Account") ? "bg-white" : "bg-black"}`}>
        <Link href="/Account" id="wd-account-link"
        className={`text-decoration-none ${ isActive("/Account") ? "text-danger" : "text-white"}`}>
          <FaRegCircleUser className={`fs-1 ${isActive("/Account") ? "text-danger" : "text-white"}`}/>
          <br />Account
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${isActive("/Dashboard") ? "bg-white" : "bg-black"}`}>
        <Link href="/Dashboard" id="wd-dashboard-link"
        className={`text-decoration-none ${ isActive("/Dashboard") ? "text-danger" : "text-white"}`}>
          <AiOutlineDashboard className={`fs-1 text-danger`}/>
          <br />Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${isActive("/Courses") ? "bg-white" : "bg-black"}`}>
        <Link href="/Dashboard" id="wd-courses-link"
        className={`text-decoration-none ${ isActive("/Courses") ? "text-danger" : "text-white"}`}>
          <LiaBookSolid className={`fs-1 text-danger`}/>
          <br />Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${isActive("/Calendar") ? "bg-white" : "bg-black"}`}>
        <Link href="/Calendar" id="wd-calendar-link"
        className={`text-decoration-none ${ isActive("/Calendar") ? "text-danger" : "text-white"}`}>
          <IoCalendarOutline className={`fs-1 text-danger`}/>
          <br />Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${isActive("/Inbox") ? "bg-white" : "bg-black"}`}>
        <Link href="/Inbox" id="wd-inbox-link"
        className={`text-decoration-none ${ isActive("/Inbox") ? "text-danger" : "text-white"}`}>
          <FaInbox className={`fs-1 text-danger`}/>
          <br />Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${isActive("/Labs") ? "bg-white" : "bg-black"}`}>
        <Link href="/Labs" id="wd-labs-link"
        className={`text-decoration-none ${ isActive("/Labs") ? "text-danger" : "text-white"}`}>
          <LiaCogSolid className={`fs-1 text-danger`}/>
          <br />Labs
        </Link>
      </ListGroupItem>

    </ListGroup>
);}
