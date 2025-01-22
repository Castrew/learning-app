import moment from "moment";
import {
  Appointment,
  GroupedAppointment,
} from "../core/react-query/appointments/types";

export const combineApptsByGroupId = (appointments: Appointment[]) => {
  const groupedAppointments: { [key: string]: GroupedAppointment } = {};

  appointments.forEach((app) => {
    const groupId = app.groupId;

    if (!groupedAppointments[groupId]) {
      groupedAppointments[groupId] = {
        userId: app.userId,
        username: app.username,
        staffId: app.staffId,
        staffName: app.staffName,
        groupId: app.groupId,
        treatments: [],
      };
    }

    groupedAppointments[groupId].treatments.push({
      appointmentId: app.appointmentId,
      treatmentId: app.treatmentId,
      treatmentTitle: app.treatmentTitle,
      treatmentDescription: app.treatmentDescription,
      treatmentDuration: app.treatmentDuration,
      date: app.date,
      start: app.start,
    });
  });

  return Object.values(groupedAppointments);
};

export const findEarliestAppointment = (appointments) => {
  return appointments.reduce((earliest, current) => {
    const earliestDateTime = moment(
      `${earliest.date} ${earliest.start}`,
      "MM-DD-YYYY HH:mm"
    );
    const currentDateTime = moment(
      `${current.date} ${current.start}`,
      "MM-DD-YYYY HH:mm"
    );

    // If the current appointment is earlier, update the earliest appointment
    return currentDateTime.isBefore(earliestDateTime) ? current : earliest;
  });
};
