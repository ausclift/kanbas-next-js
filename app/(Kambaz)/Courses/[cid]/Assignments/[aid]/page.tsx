const today = new Date().toISOString().split("T")[0];

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br/><br/>
      <input id="wd-name" defaultValue="A1 - ENV + HTML"/><br/><br/>
      <textarea
        id="wd-description"
        style={{ width: "80%", height: "200px" }}
        defaultValue={
`The assignment is available online.

Submit a link to the landing page of your web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`
        }/>
      <br/><br/>
      <table style={{width: "80%" }} cellPadding={10}>
        <tbody>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} type="number"/>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENT">
                <option value="ASSIGNMENT">Assignment</option>
                <option value="QUIZ">Quiz</option>
                <option value="TEST">Test</option>
                <option value="PROJECT">Project</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option selected value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option selected value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </td>
          </tr>

          <tr>
            <td/>
            <td>
              <label>Online Entry Options</label><br/><br/>
              <label><input id="wd-text-entry" type="checkbox"/>Text Entry</label><br/>
              <label><input id="wd-website-url" type="checkbox"/>Website URL</label><br/>
              <label><input id="wd-media-recordings" type="checkbox"/>Media Recordings</label><br/>
              <label><input id="wd-student-annotation" type="checkbox"/>Student Annotations</label><br/>
              <label><input id="wd-file-upload" type="checkbox"/>File Uploads</label><br/>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label>Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to:</label><br/>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td/>
            <td>
              <label htmlFor="wd-due-date">Due</label><br/>
              <input type="date" id="wd-due-date" defaultValue={today}/><br/><br/>

              <table style={{ borderCollapse: "collapse"}}>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="wd-available-from">Available</label><br/>
                    </td>
                    <td>
                      <label htmlFor="wd-available-until">Until</label><br/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="date" id="wd-available-from" defaultValue={today}/>
                    </td>
                    <td>
                      <input type="date" id="wd-available-until" defaultValue={today}/>
                    </td>
                  </tr>
                </tbody>
              </table>

            </td>
          </tr>
        </tbody>
      </table>

      <hr style={{ width: "80%", marginLeft: 0}}/>
      <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", marginLeft: 0 }}>
        <button id="wd-cancel-assignment" style={{ marginRight: "5px" }}>Cancel</button>
        <button id="wd-save-assignment">Save</button>
      </div>
    </div>
);}
