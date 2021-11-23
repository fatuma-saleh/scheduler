import React from "react"
import 'components/Appointment/styles.scss'
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"
import Status from "./Status"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE"
const SAVING ="SAVING"
const DELETING = "DELETING"

export default function Appointment(props) {
   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
   );

   function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id,interview)
      .then(() => {
         transition(SHOW)
      })
      

    }
    const deleteAppointment = function(id){
      transition(DELETING)
     props.cancelInterview(id)
     .then(() => {
      transition(EMPTY)
     })
     
    }

   return (
      <>
      <article className="appointment">
         <Header time={props.time} />
         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
         {mode === SHOW && (
            <Show
               student={props.interview.student}
               interviewer={props.interview.interviewer}
               onDelete={deleteAppointment}
               id={props.id}
            />
         )}
         {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
         {mode === SAVING && <Status message = {"SAVING"}/>}
         {mode === DELETING && <Status message = {"DELETING"}/>}
         {/* <article className="appointment">{props.interview ? <Show student= {props.interview.student} interviewer={props.interview.interviewer}/>: <Empty/>} </article>  */}
         </article>
      </>
     
   );


}

