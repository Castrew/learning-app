export interface RequestTypes {
  getAllUsers: {
    id: string;
    name: string;
    email: string;
  };
  deleteUser: {
    id: string;
  };
  updateUser: {
    id: string;
    name?: string;
    email?: string;
  };
  createUser: {
    id: string;
    name?: string;
    email?: string;
  };
}
