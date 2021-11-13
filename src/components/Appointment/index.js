 import React from "react"
 import 'components/Appointment/styles.scss'
 import Header from "./Header"
 import Empty from "./Empty"
 import Show from "./Show"


export default function Appointment(props) {
   console.log("lastttt",props)
   return (
     <>
  <Header time={props.time}/>   
 {/* <article className="appointment">{props.time ? `Appointment at ${props.time}`: `No Appointments`} </article>  */}
 <article className="appointment">{props.interview ? <Show student= {props.interview.student} interviewer={props.interview.interviewer}/>: <Empty/>} </article> 
  </>
   );


}