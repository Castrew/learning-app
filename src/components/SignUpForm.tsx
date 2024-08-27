"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUp } from "../../actions/auth.actions";

interface SignUpFormProps {
  username: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = () => {
  const [error, setError] = useState("");

  const router = useRouter();
  const defaultValues = {
    userId: "",
    username: "",
    password: "",
    hashedPassword: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpFormProps>({ defaultValues });
  const onSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
    const res = await signUp(data);
    if (res.status === 404) {
      setError(String(res.error));
      return;
    }
    setError("");
    router.push("/");
  };

  const password = watch("password");

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              {...register("username", {
                required: "Enter your username",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters long",
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (confirmPassword) =>
                  confirmPassword === password || "Passwords do not match",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            <Typography color="error">{error}</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Create
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
