import { useState } from "react";
import "../styles/editor.css";

export default function Editor() {
  return (
    <div className="ed-editor-page">
      <div className="ed-main-frame">
        <h1 className="ed-editor-title">Data Editor</h1>
        <h2 className="ed-team-name">NovaByte Collective</h2>

        <table className="ed-editor-table">
          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Birth Place</th>
              <th>Birth Date</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Line ID</th>
              <th>Github ID</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alexander Pratama</td>
              <td>Jakarta</td>
              <td>12 January 2006</td>
              <td>+62 812-3456-7890</td>
              <td>alexander.pratama@email.com</td>
              <td>alexanderpratama</td>
              <td>alexanderpratama</td>
            </tr>

            <tr>
              <td>Irwansya Rizya</td>
              <td>Jakarta</td>
              <td>12 July 2006</td>
              <td>+62 812-3456-7893</td>
              <td>irwansyarizya@gmail.com</td>
              <td>irwnnnsya</td>
              <td>irwansyaaaaris</td>
            </tr>

            <tr>
              <td>Tiara Anugeri</td>
              <td>Jakarta</td>
              <td>10 September 2006</td>
              <td>+62 812-3456-7880</td>
              <td>tiaranugeri@gmail.com</td>
              <td>tiaranugeri</td>
              <td>tiaranugerii</td>
            </tr>

            <tr>
              <td>Stephanie Zahra</td>
              <td>Jakarta</td>
              <td>1 July 2006</td>
              <td>+62 812-3456-7770</td>
              <td>stephaniezahra@gmail.com</td>
              <td>stephanahra</td>
              <td>stephahraw</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ed-bottom-actions">
        <button className="ed-button ed-cancel-btn">Cancel</button>
        <button className="ed-button ed-save-btn">Save ↗</button>
      </div>
    </div>
  );
}