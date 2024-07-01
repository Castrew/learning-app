import React from "react";
import { Box } from "@mui/material";
import { TreatmentsList } from "@/components/TreatmentsList";

export const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TreatmentsList />
    </Box>
  );
};
