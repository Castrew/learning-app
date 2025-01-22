export interface RequestTypes {
  getAllUsers: {
    userId: string;
    username: string;
    passwor: string;
  };
  getOneUser: {
    userId: string;
    username?: string;
    password?: string;
  };
  deleteUser: {
    userId: string;
  };
  updateUser: {
    userId: string;
    username?: string;
    password?: string;
  };
  signUpUser: {
    userId?: string;
    username: string;
    password: string;
  };
  signInUser: {
    username: string;
    password: string;
  };
}
