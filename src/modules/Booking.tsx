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

export interface FormValues {
  selectedMember: string;
  selectedTreatmentsIds: string[];
  selectedDate: string;
  selectedTime: string;
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
    selectedMember: "",
    selectedTreatmentsIds: [],
    selectedDate: "",
    selectedTime: "",
  };

  const { register, handleSubmit, reset, setValue, control, watch, getValues } =
    useForm<FormValues>({
      defaultValues,
    });

  const handleMemberChange = (member: MemberProps) => {
    // setMemberTreatmentsIds([]);
    // setValue("selectedTreatmentsIds", []);
    reset();
    setMemberTreatmentsIds(member.treatmentId);
    setValue("selectedMember", member.name);
  };

  const handleCalendarChange = (date: string, time: string) => {
    setValue("selectedDate", date);
    setValue("selectedTime", time);
  };

  const isSelectedMember = getValues("selectedMember") !== "" ? true : false;

  if (isLoadingAllStaff || isLoadingAllTreatments) {
    return "Loading...";
  }

  console.log(watch());

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
            handleMemberChange={handleMemberChange}
          />
          <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

          {memberTreatmentsIds.length !== 0 && (
            <TreatmentsList treatments={filteredTreatments} control={control} />
          )}
          <Calendar
            control={control}
            handleCalendarChange={handleCalendarChange}
            isSelectedMember={isSelectedMember}
          />
        </Box>
      </form>
    </Box>
  );
};

export default Booking;
