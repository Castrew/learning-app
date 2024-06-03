"use client";

import { Box, Button, TextField } from "@mui/material";
import { useGetOneUser } from "@/app/core/react-query/users/hooks/useGetOneUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateTreatment } from "@/app/core/react-query/treatments/hooks/useUpdateTreatment";
import { useRouter, useParams } from "next/navigation";
import { useGetOneTreatment } from "@/app/core/react-query/treatments/hooks/useGetOneTreatment";

type Test = {
  title: string;
  duration: string;
  price: string;
};

const updateTest = () => {
  const router = useRouter();
  const params = useParams();
  const treatmentId = Number(params.treatmentId);

  const { data, isLoading } = useGetOneTreatment({ treatmentId });
  const treatment = data?.data[0];

  const defaultValues = {
    title: treatment?.title,
    duration: treatment?.duration,
    price: treatment?.price,
  };
  const updateTreatment = useUpdateTreatment();

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

  return (
    !isLoading && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          gap="10px"
          display="flex"
          flexDirection="column"
          maxWidth="250px"
          sx={{ p: "15px" }}
        >
          <TextField label="title" inputProps={register("title")} />
          <TextField label="Duration" inputProps={register("duration")} />
          <TextField label="Price" inputProps={register("price")} />
          <Button type="submit" onClick={() => router.push("/")}>
            Update
          </Button>
        </Box>
      </form>
    )
  );
};

export default updateTest;
