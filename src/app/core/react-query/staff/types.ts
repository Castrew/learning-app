import { Treatment } from "../treatments/types";

export type Staff = {
  id: string;
  name: string;
  treatments: Treatment[];
};
