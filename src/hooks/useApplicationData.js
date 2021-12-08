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

  function updateSpots(requestType) {
    const days = [...state.days];
    const dayIndex = days.findIndex((day) => day.name === state.day);
    const day = days[dayIndex];
    if (requestType === "bookAppointment") {
      day.spots -= 1;
    } else {
      day.spots += 1;
    }
    days[dayIndex] = { ...day };
    setState((pre) => ({ ...pre, days }));
  }

  function bookInterview(id, interview) {
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
      });

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
      setState((prev) => ({
        ...prev,
        appointments,
      }));

      return res;
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
