"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from "react-hook-form";
import React from "react";
import { useCreateStaff } from "src/core/react-query/staff/hooks/useCreateStaff";
import { useUpdateStaff } from "src/core/react-query/staff/hooks/useUpdateStaff";
import { useRouter } from "next/navigation";
import TreatmentFormList from "./TreatmentFormList";
import { toasts } from "./Toast";
import { Staff } from "src/core/react-query/staff/types";
import { Treatment } from "src/core/react-query/treatments/types";

type CreateUpdateMemberProps = {
  member?: Staff;
  treatments?: Treatment[];
  memberTreatmentsIds?: string[];
};

interface FormValues {
  name: string;
  treatmentIds: string[];
}

const CreateUpdateMember: React.FC<CreateUpdateMemberProps> = ({
  member,
  treatments,
  memberTreatmentsIds,
}) => {
  const router = useRouter();
  const createMember = useCreateStaff();
  const updateMember = useUpdateStaff();

  const formContext = useForm<FormValues>({
    defaultValues: {
      name: member?.name || "",
      treatmentIds: memberTreatmentsIds || [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (member?.id) {
      updateMember.mutate(
        { staffId: member.id, ...data },
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
          formContext.reset();
        },
        onError: (error) => toasts.Error(error),
      });
    }
  };

  return (
    <FormProvider {...formContext}>
      <form onSubmit={formContext.handleSubmit(onSubmit)}>
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
              {member?.id ? "Update Member" : "Create Member"}
            </Typography>
            <Controller
              control={formContext.control}
              name="name"
              rules={{
                required: "Member name is required",
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
            <TreatmentFormList treatments={treatments} />
            <Box display="flex" justifyContent="space-between" mt={2}>
              {member?.id && (
                <Button
                  sx={{ m: 1 }}
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => {
                    formContext.reset();
                    router.back();
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                sx={{ m: 1 }}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {member?.id ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default CreateUpdateMember;
