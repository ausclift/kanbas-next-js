import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Drake</span>{" "}
          <span className="wd-last-name">Maye</span></td>
      <td className="wd-login-id">001234560S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">TEACHER</td>
      <td className="wd-last-activity">2020-10-22</td>
      <td className="wd-total-activity">10:21:32</td></tr>

      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Mack</span>{" "}
          <span className="wd-last-name">Hollins</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-07-01</td>
      <td className="wd-total-activity">10:21:32</td></tr>

      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Stefon</span>{" "}
          <span className="wd-last-name">Diggs</span></td>
      <td className="wd-login-id">001234562S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-21</td>
      <td className="wd-total-activity">10:21:32</td></tr>

      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">TreVeyon</span>{" "}
          <span className="wd-last-name">Henderson</span></td>
      <td className="wd-login-id">001234563S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-17</td>
      <td className="wd-total-activity">10:21:32</td></tr>

      <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Marcus</span>{" "}
          <span className="wd-last-name">Jones</span></td>
      <td className="wd-login-id">001234564S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">TA</td>
      <td className="wd-last-activity">2020-10-17</td>
      <td className="wd-total-activity">10:21:32</td></tr>
    </tbody>
   </Table>
  </div> );}