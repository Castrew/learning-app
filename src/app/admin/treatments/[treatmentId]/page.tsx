import React from "react";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { validateRequest } from "../../../../../lib/auth";
import UpdateCreateTreatment from "@/components/CreateUpdateTreatment";

const UpdateTreatment = async () => {
  const { user } = await validateRequest();

<<<<<<< LEA-12
<<<<<<< Updated upstream
type Test = {
  title: string;
  duration: string;
  price: string;
};

const updateTest = () => {
  const router = useRouter();
  const params = useParams();
  const treatmentId = Number(params.treatmentId);
  const updateTreatment = useUpdateTreatment();

  const { data, isLoading } = useGetOneTreatment({ treatmentId });
  const treatment = data?.data[0];

  const defaultValues = {
    title: treatment?.title,
    duration: treatment?.duration,
    price: treatment?.price,
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const onSubmit: SubmitHandler<Test> = (data) => {
    updateTreatment.mutate({ treatmentId: treatment?.id, ...data });
  };

  useEffect(() => {
    reset({
      title: treatment?.title,
      duration: treatment?.duration,
      price: treatment?.price,
    });
  }, [treatment?.treatment, treatment?.email, treatment?.price]);
=======
=======
>>>>>>> main
  if (!user) {
    return redirect("/sign-in");
  }
  const isAdmin = user?.id === "16aafx78kvkvgt2";
<<<<<<< LEA-12
>>>>>>> Stashed changes
=======
  console.log(isAdmin);
>>>>>>> main

  return (
    <Box>
      <UpdateCreateTreatment />
    </Box>
  );
};

export default UpdateTreatment;
