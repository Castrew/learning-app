"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateTreatment } from "@/app/core/react-query/treatments/hooks/useCreateTreatment";
import { useRouter } from "next/navigation";

interface Test {
  treatmentId: number;
  title: string;
  duration: string;
  price: string;
}

export const TestComponent = () => {
  const router = useRouter();
  const createTreatment = useCreateTreatment();
  const { register, handleSubmit } = useForm<Test>();
  const onSubmit: SubmitHandler<Test> = (data) => {
    createTreatment.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <Box>
          title: <input {...register("title")} />
        </Box>
        <Box>
          duration: <input {...register("duration")} />
        </Box>
        <Box>
          price: <input {...register("price")} />
        </Box>
      </Box>
      <Button type="submit" onClick={() => router.push("/")}>
        Create
      </Button>
    </form>
  );
};

export default TestComponent;
