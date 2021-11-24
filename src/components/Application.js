import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
// import axios from "axios"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  
  // function bookInterview(id, interview) {
  
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };


  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
       
  // return  axios.put(`http://localhost:8001/api/appointments/${id}`,{interview}) 
  //   .then((res) =>{

  //     setState({
  //       ...state,
  //       appointments
  //     });
  //     return res
  //   })
    
  // }

  // function cancelInterview(id){
    
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return  axios.delete(`http://localhost:8001/api/appointments/${id}`) 
  //   .then((res) =>{

  //     setState({
  //       ...state,
  //       appointments
  //     });
  //     return res
  //   })
    

  // }

  
  let dailyAppointments = getAppointmentsForDay(state, state.day)
  let dailyInterviewers =  getInterviewersForDay(state, state.day)
  // const setDay = day => setState(pre => ({ ...pre, day }));

  const appointmentArray = dailyAppointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        // id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

