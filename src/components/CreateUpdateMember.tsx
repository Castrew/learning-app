"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect } from "react";
import { RichTextInput } from "./RichText";
import { useParams } from "next/navigation";
import { useCreateStaff } from "@/app/core/react-query/staff/hooks/useCreateStaff";
import { useUpdateStaff } from "@/app/core/react-query/staff/hooks/useUpdateStaff";
import { useGetOneStaff } from "@/app/core/react-query/staff/hooks/useGetOneStaff";
import { useRouter } from "next/navigation";
import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import TreatmentsList from "./TreatmentList";
import { toasts } from "./Toast";

interface FormValues {
  name: string;
  treatmentIds: string[];
}

const CreateUpdateMember = () => {
  const params = useParams();
  const router = useRouter();
  const createMember = useCreateStaff();
  const updateMember = useUpdateStaff();

  const staffId = String(params?.staffId);
  const { data: member, isLoading: isOneMemeberLoading } = useGetOneStaff({
    staffId,
  });
  const { data: treatments, isLoading: isLoadingAllTreatments } =
    useGetAllTreatments();

  const memberTreatments = member?.treatments.map((treatment) => {
    return treatment.id;
  });

  const { register, handleSubmit, reset, control, watch } = useForm<FormValues>(
    {
      defaultValues: {
        name: "",
        treatmentIds: [],
      },
    }
  );

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        treatmentIds: memberTreatments,
      });
    }
  }, [member, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (staffId !== "undefined") {
      updateMember.mutate(
        { staffId, ...data },
        {
          onSuccess: () => {
            toasts.Success("Member updated successfully");
            router.push("/admin/staff");
          },
          onError: (error) => toasts.Error(error),
        }
      );
    } else {
      createMember.mutate(data, {
        onSuccess: () => {
          toasts.Success("Member created successfully");
          reset();
        },
        onError: (error) => toasts.Error(error),
      });
    }
  };

  if (isLoadingAllTreatments || isOneMemeberLoading) {
    return "Loading...";
  }

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
          maxWidth="1024px"
          width="100%"
          mx="auto"
          p="20px"
          bgcolor="background.paper"
          boxShadow={3}
          borderRadius={4}
        >
          <Typography fontSize="1.5rem" fontWeight="bold">
            {staffId ? "Update Member" : "Create Member"}
          </Typography>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Member name is required",
              minLength: {
                value: 2,
                message: "Password must be at least 2 characters long",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                placeholder="Name"
                fullWidth
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
          <TreatmentsList treatments={treatments} control={control} />
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
            >
              {staffId ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CreateUpdateMember;
