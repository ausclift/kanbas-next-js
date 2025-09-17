import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A1 - ENV + HTML
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A2 - CSS </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A3 - JS
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            A4 - React
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
      </ul>

      <h3 id="wd-quizzes-title">
        QUIZZES 15% of Total <button>+</button> </h3>
      <ul id="wd-quiz-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Q1 - ENV + HTML
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Q2 - CSS
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Q3 - JS
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Q4 - React
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
      </ul>

      <h3 id="wd-exams-title">
        EXAMS 20% of Total <button>+</button> </h3>
      <ul id="wd-exam-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            E1 - Midterm
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            E2 - Final
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
      </ul>

      <h3 id="wd-project-title">
        PROJECT 25% of Total <button>+</button> </h3>
      <ul id="wd-project-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
             className="wd-assignment-link" >
            Pazza Implementation
          </Link><br/>
Multiple Modules | <b>Not Available Until</b> May 5 at 6:00pm |<br/>
<b>Due</b> May 12 at 11:59pm | 100 pts
          </li>
      </ul>
    </div>
);}
