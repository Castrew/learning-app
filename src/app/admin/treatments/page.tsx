import React from "react";
import { Box, Button } from "@mui/material";
import { redirect } from "next/navigation";
import { validateRequest } from "../../../../lib/auth";
import { TreatmentsList } from "@/components/TreatmentsList";

const TestComponent = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }
  const isAdmin = user?.id === "16aafx78kvkvgt2";

  return (
    <Box>
      <TreatmentsList isAdmin={isAdmin} />
    </Box>
  );
};

export default TestComponent;
