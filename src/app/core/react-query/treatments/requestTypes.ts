export interface RequestTypes {
  getAllTreatments: {
    treatmentId: number;
    title: string;
    duration: string;
    price: string;
  };

  getOneTreatment: {
    treatmentId: number;
  };

  deleteTreatment: {
    treatmentId: number;
  };

  updateTreatment: {
    treatmentId: number;
    title?: string;
    duration?: string;
    price?: string;
  };

  createTreatment: {
    treatmentId: number;
    title?: string;
    duration?: string;
    price?: string;
  };
}
