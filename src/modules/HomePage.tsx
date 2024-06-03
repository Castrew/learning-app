"use client";

import { Box } from "@mui/material";
import { TreatmentsList } from "@/components/TreatmentsList";

export const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <TreatmentsList />
    </Box>
  );
};

import React, { useState } from "react";
