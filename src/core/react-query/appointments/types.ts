export type Appointment = {
  appointmentId: string;
  userId: string;
  username: string;
  treatmentId: string;
  treatmentTitle: string;
  treatmentDescription: string;
  treatmentDuration: string;
  staffId: string;
  staffName: string;
  date: string;
  start: string;
  groupId: string;
};

export type GroupedTreatment = {
  appointmentId: string;
  treatmentId: string;
  treatmentTitle: string;
  treatmentDescription: string;
  treatmentDuration: string;
  date: string;
  start: string;
};
export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type GroupedAppointment = {
  userId: string;
  username: string;
  staffId: string;
  staffName: string;
  groupId: string;
  treatments: GroupedTreatment[];
};

export interface CombinedAppointmentsResponse {
  combinedAppointmentsByGroup: GroupedAppointment[];
  pagination: Pagination;
}
