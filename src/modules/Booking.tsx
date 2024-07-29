"use client";

import { Box, Divider } from "@mui/material";
import { useState } from "react";
import { useGetAllStaff } from "@/app/core/react-query/staff/hooks/useGetAllStaff";
import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import StaffList from "@/components/StaffList";
import TreatmentsList from "@/components/TreatmentList";
import { Treatment } from "@/app/core/react-query/treatments/types";

export interface MemberProps {
  id: string;
  name: string;
  treatmentId: string[];
}

interface FormValues {
  member: string;
  treatmentId: string[];
}

const Booking = () => {
  const { data: allStaff, isLoading: isLoadingAllStaff } = useGetAllStaff();
  const { data: allTreatments, isLoading: isLoadingAllTreatments } =
    useGetAllTreatments();
  const [treatmentsId, setTreatmentsId] = useState<string[]>([]);
  const staffMembers = allStaff?.data?.items;
  const filteredTreatments = allTreatments?.data?.items.filter(
    (treatment: any) => treatmentsId.includes(treatment.id)
  );

  const defaultValues = {
    member: "",
    treatmentId: [],
  };

  const { register, handleSubmit, reset, setValue, control, watch } =
    useForm<FormValues>({
      defaultValues,
    });

  const handleMemberChange = (member: MemberProps) => {
    setTreatmentsId([]);
    setValue("treatmentId", []);
    setTreatmentsId(member.treatmentId);
    setValue("member", member.name);
  };

  const test = watch("member");
  const test1 = watch("treatmentId");
  console.log(test, test1);

  if (isLoadingAllStaff || isLoadingAllTreatments) {
    return "Loading...";
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        overflow: "auto",
        mt: 2,
        mb: 2,
        height: "100%",
      }}
    >
      <form style={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ display: "flex", width: "100vh" }}>
          <StaffList
            staffMembers={staffMembers}
            register={register}
            handleMemberChange={handleMemberChange}
          />
          <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />
          {treatmentsId.length !== 0 && (
            <TreatmentsList treatments={filteredTreatments} control={control} />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Booking;
