"use client";

import { Box, Divider } from "@mui/material";
import { useState } from "react";
import { useGetAllStaff } from "@/app/core/react-query/staff/hooks/useGetAllStaff";
import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import { useForm } from "react-hook-form";
import StaffList from "@/components/StaffList";
import TreatmentsList from "@/components/TreatmentList";
import Calendar from "@/components/Calentar";

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
  const [memberTreatmentsIds, setMemberTreatmentsIds] = useState<string[]>([]);
  const staffMembers = allStaff?.data?.items;
  const filteredTreatments = allTreatments?.data?.items.filter(
    (treatment: any) => memberTreatmentsIds.includes(treatment.id)
  );

  const defaultValues = {
    member: "",
    treatmentsIds: [],
  };

  const { register, handleSubmit, reset, setValue, control, watch } =
    useForm<FormValues>({
      defaultValues,
    });

  const handleMemberChange = (member: MemberProps) => {
    setMemberTreatmentsIds([]);
    setValue("treatmentId", []);
    setMemberTreatmentsIds(member.treatmentId);
    setValue("member", member.name);
  };

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
          {memberTreatmentsIds.length !== 0 && (
            <TreatmentsList treatments={filteredTreatments} control={control} />
          )}
          <Calendar />
        </Box>
      </form>
    </Box>
  );
};

export default Booking;
