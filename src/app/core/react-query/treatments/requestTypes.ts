export interface RequestTypes {
  getAllTreatments: {
    treatmentId: string;
    title: string;
    duration: string;
    price: string;
    description: string;
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
    duration?: string;
    price?: string;
    description?: string;
  };

  createTreatment: {
    title?: string;
    duration?: string;
    price?: string;
    description?: string;
  };
}
