"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateTreatment } from "@/app/core/react-query/treatments/hooks/useUpdateTreatment";
import { useRouter, useParams } from "next/navigation";
import { Treatment } from "@/app/core/react-query/treatments/types";
import { useCreateTreatment } from "@/app/core/react-query/treatments/hooks/useCreateTreatment";
import { useGetOneTreatment } from "@/app/core/react-query/treatments/hooks/useGetOneTreatment";
import { RichTextInput } from "./RichText";

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

  const { register, handleSubmit, reset, control } = useForm<Treatment>({
    defaultValues,
  });

  useEffect(() => {
    reset({
      title: treatment?.title,
      duration: treatment?.duration,
      price: treatment?.price,
      description: treatment?.description,
    });
  }, [
    treatment?.description,
    treatment?.duration,
    treatment?.price,
    treatment?.title,
  ]);

  const onSubmit: SubmitHandler<Treatment> = (data) => {
    if (treatment?.id) {
      updateTreatment.mutate({ treatmentId: treatment?.id, ...data });
    } else {
      createTreatment.mutate({ ...data });
    }
  };
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
            <TextField
              label="Title"
              variant="outlined"
              {...register("title")}
              fullWidth
              margin="normal"
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
            <TextField
              label="Duration"
              variant="outlined"
              {...register("duration")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              variant="outlined"
              {...register("price")}
              fullWidth
              margin="normal"
            />
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
