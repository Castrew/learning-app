import React, { useState } from "react";
import { signOut } from "../../actions/auth.actions";
import { Box, Button } from "@mui/material";
import { TreatmentCard } from "@/components/TreatmentCard";

export const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TreatmentCard />
    </Box>
  );
};
