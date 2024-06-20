"use client";

import { Box, Button, TextField } from "@mui/material";
import { useGetOneUser } from "@/app/core/react-query/users/hooks/useGetOneUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateUser } from "@/app/core/react-query/users/hooks/useUpdateUser";
import { useRouter, useParams } from "next/navigation";
import { useGetOneTreatment } from "@/app/core/react-query/treatments/hooks/useGetOneTreatment";

type Test = {
  name: string;
  email: string;
};

const updateTest = () => {
  const router = useRouter();
  const params = useParams();
  // const userId = Number(params.testId);
  const treatmentId = Number(params.testId);

  // const { data, isLoading } = useGetOneUser({ userId });
  const { data, isLoading } = useGetOneTreatment({ treatmentId });
  const treatment = data?.data[0];

  // const defaultValues = { name: user?.name, email: user?.email };
  // const updateUser = useUpdateUser();

  // const { register, handleSubmit, reset } = useForm({
  //   defaultValues,
  // });
  // const onSubmit: SubmitHandler<Test> = (data) => {
  //   updateUser.mutate({ id: user?.id, ...data });
  // };

  // useEffect(() => {
  //   reset({ name: user?.name, email: user?.email });
  // }, [user?.name]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box></Box>
    // !isLoading && (
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <Box
    //       gap="10px"
    //       display="flex"
    //       flexDirection="column"
    //       maxWidth="250px"
    //       sx={{ p: "15px" }}
    //     >
    //       <TextField label="Name" inputProps={register("name")} />
    //       <TextField
    //         sx={{ mb: "15px" }}
    //         label="Email"
    //         inputProps={register("email")}
    //       />
    //       <Button type="submit" onClick={() => router.push("/")}>
    //         Update
    //       </Button>
    //     </Box>
    //   </form>
    // )
  );
};

export default updateTest;
