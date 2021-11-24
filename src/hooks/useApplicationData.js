import { useState, useEffect } from "react";
import axios from "axios"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(pre => ({ ...pre, day }));

  useEffect(() => {

    const getDays = axios.get(`http://localhost:8001/api/days`)
    const getAppointments = axios.get(`http://localhost:8001/api/appointments`)
    const getInterviewers = axios.get(`http://localhost:8001/api/interviewers`)

    Promise.all([getDays, getAppointments, getInterviewers])
      .then((res) => {
        setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      })

  }, []);

  function bookInterview(id, interview) {
    //  const appointment = state.appointments[id]
    //  appointment.interview = interview

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // const appointments = states.appointments
    // appointments[id] = appointment

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments
        });

        return res
      })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments
        });

        return res
      })
  }

  return { state, setDay, bookInterview, cancelInterview }

}