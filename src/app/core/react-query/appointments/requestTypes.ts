export interface RequestTypes {
  getAllAppointments: {
    id?: string;
    selectedMember?: string;
    selectedTreatmentsIds?: string[];
    selectedDate?: string;
    selectedTime?: string;
    selectedDuration?: string;
  };

  getOneAppointment: {
    id: string;
  };

  deleteAppointment: {
    id: string;
  };

  updateAppointment: {
    id: string;
    selectedMember?: string;
    selectedTreatmentsIds?: string[];
    selectedDate?: string;
    selectedTime?: string;
    selectedDuration?: string;
  };

  createAppointment: {
    staffId: string;
    treatmentIds: string[];
    date: string;
    start: string;
  };
}
