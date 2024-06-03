export interface RequestTypes {
  getAllUsers: {
    id: number;
    name: string;
    email: string;
  };
  getOneUser: {
    userId: number;
    name?: string;
    email?: string;
  };
  deleteUser: {
    id: number;
  };
  updateUser: {
    id: number;
    name?: string;
    email?: string;
  };
  createUser: {
    id: number;
    name?: string;
    email?: string;
  };
}
