export type Staff = {
  id?: string;
  name?: string;
  treatment?: {
    treatmentId: string;
    price: string;
    duration: string;
    title: string;
  };
};
