import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // const [error, setError] = useState("");

  const reset = function(){
    setStudent("")
    setInterviewer(null)
  }


  const cancel = function(){
    reset();
    props.onCancel();
  }


  //  const validate =function(){
  //    console.log("student",student)
  //    if(student === "" || interviewer ==="") {
  //      setError("Please type in student name and select an interviewer ")
  //    }
  //    setError("");
  //    props.onSave(student,interviewer);
  //  }

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input 
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={student}
        placeholder="Enter Student Name"
        onChange={(event)=>setStudent(event.target.value)}
  
      />
      {/* <p>{error}</p> */}
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      // onChange={props.setInterviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      {/* <Button danger onClick={props.onCancel} >Cancel</Button> */}
      <Button danger onClick={cancel} >Cancel</Button>
      {/* <Button confirm onClick={props.onSave}>Save</Button> */}
      <Button confirm onClick={()=>props.onSave(student,interviewer)}>Save</Button>
    </section>
  </section>
</main>

  )
  }