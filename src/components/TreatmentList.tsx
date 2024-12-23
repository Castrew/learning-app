"use client";

import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { Treatment } from "src/app/core/react-query/treatments/types";

interface TreatmentsListProps {
  treatments: Treatment[];
  control?: Control<any>;
}

const TreatmentsList = ({ treatments, control }: TreatmentsListProps) => {
  const midIndex = Math.ceil(treatments.length / 2);
  const firstColumn = treatments.slice(0, midIndex);
  const secondColumn = treatments.slice(midIndex);
  return (
    <Box
      sx={{
        width: "1024px",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 200, padding: "8px" }}>
          <FormGroup>
            {firstColumn.map((treatment: Treatment, index) => (
              <Controller
                key={treatment.id}
                name="treatmentIds"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`treatment-col1-${index}`}
                        checked={field.value.includes(treatment.id)}
                        sx={{
                          "&.Mui-checked": {
                            color: "#f06292",
                          },
                          "&:hover": {
                            bgcolor: "#f8bbd0",
                          },
                        }}
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
                    label={
                      <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                        {treatment.title}
                      </Typography>
                    }
                  />
                )}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ width: 200, padding: "8px" }}>
          <FormGroup>
            {secondColumn.map((treatment: Treatment, index) => (
              <Controller
                key={treatment.id}
                name="treatmentIds"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`treatment-col2-${index}`}
                        checked={field.value.includes(treatment.id)}
                        sx={{
                          "&.Mui-checked": {
                            color: "#f06292",
                          },
                          "&:hover": {
                            bgcolor: "#f8bbd0",
                          },
                        }}
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
                    label={
                      <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                        {treatment.title}
                      </Typography>
                    }
                  />
                )}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default TreatmentsList;
