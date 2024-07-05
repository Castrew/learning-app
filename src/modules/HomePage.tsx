import React, { useState } from "react";
import { signOut } from "../../actions/auth.actions";
import { Box, Button } from "@mui/material";
import { TreatmentsList } from "@/components/TreatmentsList";

export const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TreatmentsList />
    </Box>
  );
};
