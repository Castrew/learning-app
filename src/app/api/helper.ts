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
        appointmentId: app.appointmentId,
        userId: app.userId,
        username: app.username,
        staffId: app.staffId,
        staffName: app.staffName,
        groupId: app.groupId,
        treatments: [],
      };
    }

    groupedAppointments[groupId].treatments.push({
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
