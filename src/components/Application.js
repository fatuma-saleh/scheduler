import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import axios from "axios"
import { getAppointmentsForDay } from "helpers/selectors";
//Appointments

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   },

//   "last": {
//     id: "last",
//     time: "5pm"
//   }
// };


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  //const dailyAppointments = [];
  let dailyAppointments = getAppointmentsForDay(state, state.day)
  //copy the previous state and changing the day
  const setDay = day => setState(pre => ({ ...pre, day }));
  // const setDays = days => setState(pre => ({ ...pre, days }));
  // const setAppointments = appointments => setState(pre => ({ ...pre, appointments }));

  const appointmentArray = dailyAppointments.map((appointment) => {

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    )
  });

  useEffect(() => {
    //   axios.get(`http://localhost:8001/api/days`).then(response => {

    //     console.log("response days", response);
    //     setDays(response.data)
    //   });


    const getDays = axios.get(`http://localhost:8001/api/days`)
    const getAppointments = axios.get(`http://localhost:8001/api/appointments`)
    Promise.all([getDays, getAppointments])
      .then((res) => {
        //console.log("nested promise", res)
        setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data }));
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

