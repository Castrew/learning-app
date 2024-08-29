"use client";

import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import { Treatment } from "@/app/core/react-query/treatments/types";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  onSelectTreatment: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectTreatment }) => {
  const { data, isLoading } = useGetAllTreatments();
  const treatments = data?.data?.items;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCheckboxChange = (id: string) => {
    onSelectTreatment(id);
  };

  return (
    <div>
      <FormGroup>
        {treatments.map((treatment: Treatment) => (
          <FormControlLabel
            key={treatment.id}
            control={
              <Checkbox
                onChange={() => handleCheckboxChange(String(treatment.id))}
              />
            }
            label={treatment.title}
          />
        ))}
      </FormGroup>
    </div>
  );
};
