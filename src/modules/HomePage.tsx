"use client";

import { APIAxiosInstance } from "@/app/axios/api-axios-instance";
import { useDeleteUser } from "@/app/core/react-query/users/hooks/useDeleteUser";
import { useGetAllUsers } from "@/app/core/react-query/users/hooks/useGetAllUsers";
import { Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const HomePage = () => {
  const { data, isLoading } = useGetAllUsers();
  const deleteUser = useDeleteUser();
  const router = useRouter();
  const users = data?.data.items;
  console.log(users);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box display="flex" flexDirection="column">
      <Button
        onClick={() => {
          router.push("/test");
        }}
      >
        Create
      </Button>
      {users?.map((user: any) => {
        return (
          <Box key={user?.id}>
            <h1>{user?.name}</h1>
            <h4>{user?.email}</h4>
            <Button
              onClick={() => {
                deleteUser.mutate(user?.id);
              }}
            >
              Delete
            </Button>
            <Button onClick={() => router.push(`/test/${user.id}`)}>
              Update
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

import React, { useState } from "react";
