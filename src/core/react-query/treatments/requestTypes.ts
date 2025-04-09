export interface RequestTypes {
  getAllTreatments: {
    treatmentId: string;
    title: string;
    description?: string;
    duration: string;
    price: string;
  };

  getOneTreatment: {
    treatmentId: string;
  };

  deleteTreatment: {
    treatmentId: string;
  };

  updateTreatment: {
    treatmentId: string;
    title?: string;
    description?: string;
    duration?: string;
    price?: string;
  };

  createTreatment: {
    title?: string;
    description?: string;
    duration?: string;
    price?: string;
  };
}
