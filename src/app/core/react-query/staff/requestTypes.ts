export interface RequestTypes {
  getAllStaff: {
    id: string;
    name: string;
    treatmentId: string | string[];
  };

  getOneStaff: {
    name: string;
  };

  deleteStaff: {
    name: string;
  };

  updateStaff: {
    name: string;
    treatmentId: string | string[];
  };

  createStaff: {
    id: string;
    name: string;
    treatmentId: string | string[];
  };
}
