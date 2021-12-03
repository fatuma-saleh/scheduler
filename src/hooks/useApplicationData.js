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

    const getDays = axios.get(`/api/days`)
    const getAppointments = axios.get(`/api/appointments`)
    const getInterviewers = axios.get(`/api/interviewers`)

    Promise.all([getDays, getAppointments, getInterviewers])
      .then((res) => {
        setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
      })

  }, []);

  function updateSpots() {
    axios.get(`/api/days`)
      .then((res) => {
        setState(prev => ({ ...prev, days: res.data }))
        console.log("update",res.data)
      })
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {

        setState({
          ...state,
          appointments
        });
        updateSpots();

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

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments
        });

        updateSpots();
        return res
      })
  }

  return { state, setDay, bookInterview, cancelInterview }

}