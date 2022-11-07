import React, { useState } from "react";
import "./page.css";
import { NavB } from "../components/NavB";
import { AddProject } from "../components/NewProject/AddProject";
import { AddContract } from "../components/NewProject/AddContract";
import { FileUpload } from "../components/NewProject/FileUpload";
import "../components/NewProject/newProject.css";
import { Predecessors } from "../components/NewProject/Predecessors";

// function renderInfo(projectName, projectId) {
//   //console.log("project name: " + projectName);

//   // if (projectName === "") {
//   //   return <></>
//   // } else {
//     return <div>
//      <h2>{projectName} Project Information</h2>
//       <br />
//       <br />
//       <h4>Upload Files:</h4>
//       <div className='upload mx-auto'><FileUpload label={'WBS ProPricer table'} name={'propricerUpload'} projectId={projectId}/></div>
//       <div className='upload mx-auto'><FileUpload label={'Milestones Import'} name={'milestonesUpload'} projectId={projectId}/></div>
//       <br />
//       <h4>Dependencies</h4>
//       <p>What projects does this project depend on?</p>
//       <div className="project-element">
//         <Predecessors />
//       </div>
//     </div>
//   //}
// };

function renderContract(projectName, projectId) {
  return <div>
      <h2>{projectName} Contract Information:</h2>
      <div className="project-element">
        <AddContract  data = {projectId}/>
      </div>
    </div>
}

function NewProject() {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(0);

  const [userid, setUserid] = useState(0);
  const [userRole, setUserRole] = useState("");

  const getUserInfo = (uid, urole) => {
      setUserid(uid);
      setUserRole(urole);
  }

  const getProjectName = (id, name) => {
    setProjectName(name);
    //console.log("In new project - childData: " + id + ", " + name);

    setProjectId(id);
  };

  return (
    <div className="lightBlue">
      <NavB getUserInfo={getUserInfo} />
      {userRole !== "Admin" ? <div>You do not have access to this page.</div> : <div>
          <h1>Add New Project</h1>
          <br />
          <div className="mx-auto w-75">
            <AddProject getProjectName={getProjectName}/>
          </div>
          <br />
          <br />
          {projectId !== 0 ? renderContract(projectName, projectId) : null}
          {//renderInfo(projectId)
          }
        </div>
    }
    </div>
  );
}

export default NewProject;
