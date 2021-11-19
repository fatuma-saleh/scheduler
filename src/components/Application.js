import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import axios from "axios"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //const dailyAppointments = [];
  let dailyAppointments = getAppointmentsForDay(state, state.day)
  let dailyInterviewers =  getInterviewersForDay(state, state.day)

  //copy the previous state and changing the day
  const setDay = day => setState(pre => ({ ...pre, day }));
  // const setDays = days => setState(pre => ({ ...pre, days }));
  // const setAppointments = appointments => setState(pre => ({ ...pre, appointments }));

  const appointmentArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    )
  });

  useEffect(() => {

    const getDays = axios.get(`http://localhost:8001/api/days`)
    const getAppointments = axios.get(`http://localhost:8001/api/appointments`)
    const getInterviewers = axios.get(`http://localhost:8001/api/interviewers`)

    Promise.all([getDays, getAppointments, getInterviewers])
      .then((res) => {
        //console.log("nested promise", res)
        setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      })

  }, []);

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

      </section>
    </main>
  );
}

