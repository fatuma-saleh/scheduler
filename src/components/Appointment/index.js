import React from "react"
import 'components/Appointment/styles.scss'
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"
import Status from "./Status"
import Confirm from "./Confirm"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE ="ERROR_DELETE "

export default function Appointment(props) {
   const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
   );
   console.log("prosintervies",props.interview)
   
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

    const deleteAppointment = function(){

      
    transition(DELETING,true)
     props.cancelInterview(props.id)
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
              // onDelete={deleteAppointment}
              onDelete={()=> transition(CONFIRM)}
               id={props.id}
               onEdit={()=> transition(EDIT)}
            />
         )}
         {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
         {mode === SAVING && <Status message = {"SAVING"}/>}
         {mode === DELETING && <Status message = {"DELETING"}/>}
         {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteAppointment}/>}
         {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={() => back()} onSave={save}/>}
         {/* <article className="appointment">{props.interview ? <Show student= {props.interview.student} interviewer={props.interview.interviewer}/>: <Empty/>} </article>  */}
         </article>
      </>
     
   );


}

