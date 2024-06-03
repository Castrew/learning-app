"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateUser } from "../core/react-query/users/hooks/useCreateUser";
import { useRouter } from "next/navigation";

interface Test {
  id: number;
  name: string;
  email: string;
}

const TestComponent = () => {
  const router = useRouter();
  const createUser = useCreateUser();
  const { register, handleSubmit } = useForm<Test>();
  const onSubmit: SubmitHandler<Test> = (data) => {
    createUser.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <Box>
          Name: <input {...register("name")} />
        </Box>
        <Box>
          Email: <input {...register("email")} />
        </Box>
      </Box>
      <Button type="submit" onClick={() => router.push("/")}>
        Create
      </Button>
    </form>
  );
};

export default TestComponent;
