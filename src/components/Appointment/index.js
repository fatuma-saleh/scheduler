import React from "react"
import 'components/Appointment/styles.scss'
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE "

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
      props.bookInterview(props.id, interview)
         .then(() => transition(SHOW))
         .catch((error) => transition(ERROR_SAVE, true))
   }

   function deleteAppointment() {

      transition(DELETING, true)
      props.cancelInterview(props.id)
         .then(() => transition(EMPTY))
         .catch((error) => transition(ERROR_DELETE, true))
   }

   return (
      <>
         <article className="appointment" data-testid="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
               <Show
                  student={props.interview.student}
                  interviewer={props.interview.interviewer}
                  onDelete={() => transition(CONFIRM)}
                  id={props.id}
                  onEdit={() => transition(EDIT)}
                  
               />
            )}
            {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
            {mode === SAVING && <Status message={"SAVING"} />}
            {mode === DELETING && <Status message={"DELETING"} />}
            {mode === CONFIRM && <Confirm message={"Are you sure you would like to Delete ? "} onCancel={back} onConfirm={deleteAppointment} />}
            {mode === EDIT && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={() => back()} onSave={save} />}
            {mode === ERROR_SAVE && <Error message={"Can not save appointment"} onClose={back} />}
            {mode === ERROR_DELETE && <Error message={"Can not cancel appointment"} onClose={back} />}
            
         </article>
      </>
   );
}

