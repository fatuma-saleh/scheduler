import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((pre) => ({ ...pre, day }));

  useEffect(() => {
    const getDays = axios.get(`/api/days`);
    const getAppointments = axios.get(`/api/appointments`);
    const getInterviewers = axios.get(`/api/interviewers`);

    Promise.all([getDays, getAppointments, getInterviewers]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);

  function updateSpots2(state, appointments) {
    // axios.get(`/api/days`)
    //   .then((res) => {
    //     setState(prev => ({ ...prev, days: res.data }))
    //     // console.log("update",res.data)
    //   })

    const newDays = [...state.days];
    const dayObj = newDays.find((day) => day.name === state.day);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    console.log(spots);
    const newDay = { ...dayObj, spots };
    const newDaysArr = newDays.map((day) =>
      day.name === state.day ? newDay : day
    );
    // return newDaysArr;
    console.log("states,", state);
    console.log("array", newDaysArr);

    // setState({...state, days:newDaysArr})
  }

  function updateSpots(requestType) {
    const days = [...state.days];
    const dayIndex = days.findIndex((day) => day.name === state.day);
    const day = days[dayIndex];
    if (requestType === "bookAppointment") {
      day.spots -= 1;
      // days[dayIndex].spots -= 1;
    } else {
      day.spots += 1;
      // days[dayIndex].spots += 1;
    }
    days[dayIndex] = { ...day };
    const newState = {...state}
    setState({ ...newState, days });
    //return days;
  }

  //console.log("appointments-----", state.appointments);
  function bookInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview },
    // };

    const appointment = { ...state.appointments[id] };

    const create = appointment.interview ? false : true;
    appointment.interview = { ...interview };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      if (create) {
        updateSpots("bookAppointment");
      }
      setState({
        ...state,
        appointments,
        // days,
      });

      //updateSpots();
      // updateSpots(state, appointments);

      return res;
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      updateSpots();
      setState({
        ...state,
        appointments,
        // days,
      });

      // updateSpots();
      //updateSpots(state, appointments);
      return res;
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
