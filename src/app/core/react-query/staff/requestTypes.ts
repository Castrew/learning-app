export interface RequestTypes {
  getAllStaff: {
    id: string;
    name: string;
    treatmentId: string | string[];
  };

  getOneStaff: {
    staffId: string;
  };

  deleteStaff: {
    staffId: string;
  };

  updateStaff: {
    staffId: string;
    name: string;
    treatmentIds: string | string[];
  };

  createStaff: {
    name: string;
    treatmentIds: string | string[];
  };
}
