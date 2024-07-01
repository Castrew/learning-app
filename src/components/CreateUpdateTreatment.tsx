"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateTreatment } from "@/app/core/react-query/treatments/hooks/useUpdateTreatment";
import { useRouter, useParams } from "next/navigation";
import { RichTextInput } from "@/components/RichText";
import { Treatment } from "@/app/core/react-query/treatments/types";
import { useCreateTreatment } from "@/app/core/react-query/treatments/hooks/useCreateTreatment";
import { useGetOneTreatment } from "@/app/core/react-query/treatments/hooks/useGetOneTreatment";

const UpdateCreateTreatment: React.FC = (isAdmin) => {
  const params = useParams();
  const treatmentId = String(params.treatmentId);
  const { data, isLoading } = useGetOneTreatment({ treatmentId });
  const treatment = data?.data[0];
  const router = useRouter();
  const updateTreatment = useUpdateTreatment();
  const createTreatment = useCreateTreatment();
  console.log(isAdmin, "isAdmin");

  const defaultValues = {
    title: treatment?.title || "",
    duration: treatment?.duration || "",
    price: treatment?.price || "",
    description: treatment?.description || "",
  };

  const { register, handleSubmit, reset, control } = useForm({
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
    console.log(data);

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
          gap="10px"
          display="flex"
          flexDirection="column"
          maxWidth="250px"
          sx={{ p: "15px" }}
        >
          <TextField label="title" inputProps={register("title")} />
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
                    marginLeft="14px"
                    marginTop="3px"
                    fontSize="0.75rem"
                    color="error"
                  >
                    {error?.message}
                  </Typography>
                )}
              </>
            )}
          />
          <TextField label="Duration" inputProps={register("duration")} />
          <TextField label="Price" inputProps={register("price")} />
          <Button
            type="submit"
            onClick={() => router.push("/admin/treatments")}
          >
            {treatment ? "Update" : "Create"}
          </Button>
        </Box>
      </form>
    )
  );
};

export default UpdateCreateTreatment;
