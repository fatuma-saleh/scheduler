
export function getAppointmentsForDay(state, dayName) {

  for (const day of state.days) {
    if (day.name === dayName) {
      const appointmentIds = day.appointments
      const appointments = [];
      for (const appointmentId of appointmentIds) {
        appointments.push(state.appointments[appointmentId])
      }
      return appointments;
    }

  }
  return []
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObj = { student: interview.student, interviewer: state.interviewers[interview.interviewer] }
  return interviewObj

}

export function getInterviewersForDay(state, dayName) {

  for (const day of state.days) {
    if (day.name === dayName) {
      const interviewersIds = day.interviewers
      const interviewers = [];
      for (const interviewersId of interviewersIds) {
        interviewers.push(state.interviewers[interviewersId])
      }
      return interviewers;
    }

  }
  return []

}