
//... returns an array of appointments for that day
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
