"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateTreatment } from "src/core/react-query/treatments/hooks/useUpdateTreatment";
import { useRouter, useParams } from "next/navigation";
import { Treatment } from "src/core/react-query/treatments/types";
import { useCreateTreatment } from "src/core/react-query/treatments/hooks/useCreateTreatment";
import { useGetOneTreatment } from "src/core/react-query/treatments/hooks/useGetOneTreatment";
import { RichTextInput } from "./RichText";
import { DURATION_TIME } from "src/app/schedule";

export type TreatmentForm = {
  title: string;
  duration: string;
  price: string;
  description: string;
};

const CreateUpdateTreatment: React.FC = () => {
  const params = useParams();
  const updateTreatment = useUpdateTreatment();
  const createTreatment = useCreateTreatment();
  const treatmentId = String(params.treatmentId);
  const { data: treatment, isLoading } = useGetOneTreatment({ treatmentId });

  const router = useRouter();

  const defaultValues = {
    title: treatment?.title || "",
    duration: treatment?.duration || "",
    price: treatment?.price || "",
    description: treatment?.description || "",
  };

  const { handleSubmit, control, watch } = useForm<TreatmentForm>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TreatmentForm> = (data) => {
    if (treatment?.id) {
      updateTreatment.mutate({ treatmentId: treatment?.id, ...data });
    } else {
      createTreatment.mutate({ ...data });
    }
  };
  console.log(watch());

  return (
    !isLoading && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ mt: 4 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            gap="10px"
            display="flex"
            flexDirection="column"
            maxWidth="800px"
            width="100%"
            mx="auto"
            p="20px"
            bgcolor="background.paper"
            boxShadow={3}
            borderRadius={4}
          >
            <Typography fontSize="2rem">
              {treatment ? "Update treatment" : "Create treatment"}
            </Typography>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  label="Title"
                  variant="outlined"
                  value={field.value}
                  {...field}
                  fullWidth
                  margin="normal"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{
                validate: (description) =>
                  description === "" || description === "<p><br></p>"
                    ? "Description is required"
                    : true,
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RichTextInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your description ..."
                    error={!!error}
                  />
                  {error && (
                    <Typography
                      ml="14px"
                      mt="3px"
                      fontSize="0.75rem"
                      color="error"
                    >
                      {error?.message}
                    </Typography>
                  )}
                </>
              )}
            />
            <Box display="flex" justifyContent="space-between">
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="duration-label">Duration</InputLabel>
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select
                      labelId="duration-label"
                      id="duration-dropdown"
                      value={field.value || ""}
                      onChange={field.onChange}
                      label="Duration"
                    >
                      {DURATION_TIME.map((duration, index) => (
                        <MenuItem key={index} value={duration}>
                          {duration} minutes
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <TextField
                    sx={{ m: 1 }}
                    label="Price"
                    variant="outlined"
                    {...field}
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                sx={{ m: 1 }}
                variant="contained"
                color="error"
                fullWidth
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                sx={{ m: 1 }}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => router.push("/admin/treatments")}
              >
                {treatment ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    )
  );
};

export default CreateUpdateTreatment;
