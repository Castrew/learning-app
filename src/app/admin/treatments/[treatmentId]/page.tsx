import React from "react";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { validateRequest } from "../../../../../lib/auth";
import UpdateCreateTreatment from "@/components/CreateUpdateTreatment";

const UpdateTreatment = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }
  const isAdmin = user?.id === "16aafx78kvkvgt2";
  console.log(isAdmin);

  return (
    <Box>
      <UpdateCreateTreatment />
    </Box>
  );
};

export default UpdateTreatment;
