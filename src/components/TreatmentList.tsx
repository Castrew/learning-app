"use client";

import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { Treatment } from "@/app/core/react-query/treatments/types";

interface TreatmentsListProps {
  treatments: Treatment[];
  control: Control<any>;
}

const TreatmentsList = ({ treatments, control }: TreatmentsListProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        marginLeft: "8px",
      }}
    >
      <FormGroup>
        {treatments.map((treatment: any) => (
          <Controller
            key={treatment.id}
            name="treatmentId"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value.includes(treatment.id)}
                    onChange={() => {
                      const newValue = field.value.includes(treatment.id)
                        ? field.value.filter(
                            (id: string) => id !== treatment.id
                          )
                        : [...field.value, treatment.id];
                      field.onChange(newValue);
                    }}
                  />
                }
                label={treatment.title}
              />
            )}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default TreatmentsList;
