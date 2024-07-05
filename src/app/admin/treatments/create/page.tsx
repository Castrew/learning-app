import React from "react";
import { Box, Button } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { validateRequest } from "../../../../../lib/auth";
import UpdateCreateTreatment from "@/components/CreateUpdateTreatment";

const AdminCreateTreatmentPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }
  const isAdmin = user?.id === "16aafx78kvkvgt2";

  return (
    <Box>
      <UpdateCreateTreatment />
    </Box>
  );
};

export default AdminCreateTreatmentPage;
