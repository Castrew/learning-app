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
import { useUpdateTreatment } from "src/core/react-query/treatments/hooks/useUpdateTreatment";
import { useRouter } from "next/navigation";
import { useCreateTreatment } from "src/core/react-query/treatments/hooks/useCreateTreatment";
import { RichTextInput } from "./RichText";
import { DURATION_TIME } from "src/app/schedule";
import { toasts } from "./Toast";
import { Treatment } from "src/core/react-query/treatments/types";

export type TreatmentForm = {
  title: string;
  duration: string;
  price: string;
  description: string;
};

export type CreateUpdateTreatmentProps = {
  treatment?: Treatment;
};

const CreateUpdateTreatment: React.FC<CreateUpdateTreatmentProps> = ({
  treatment,
}) => {
  const updateTreatment = useUpdateTreatment();
  const createTreatment = useCreateTreatment();

  const router = useRouter();

  const defaultValues = {
    title: treatment?.title || "",
    duration: treatment?.duration || "",
    price: treatment?.price || "",
    description: treatment?.description || "",
  };

  const { handleSubmit, control } = useForm<TreatmentForm>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TreatmentForm> = (data) => {
    if (treatment?.id) {
      updateTreatment.mutate(
        { treatmentId: treatment?.id, ...data },
        {
          onSuccess: () => {
            toasts.Success("Treatment updated successfuly"),
              router.push("/admin/treatments");
          },
          onError: () => toasts.Error("Something went wrong"),
        }
      );
    } else {
      createTreatment.mutate(
        { ...data },
        {
          onSuccess: () => {
            toasts.Success("Treatment created successfuly"),
              router.push("/admin/treatments");
          },
          onError: () => toasts.Error("Something went wrong"),
        }
      );
    }
  };

  return (
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
              onClick={handleSubmit(onSubmit)}
            >
              {treatment ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CreateUpdateTreatment;
