"use client";

import { Box } from "@mui/material";
import MemberCard from "src/components/MemberCard";
import CreateUpdateMember from "src/components/CreateUpdateMember";
import { useGetAllTreatments } from "src/core/react-query/treatments/hooks/useGetAllTreatmets";

const AdminMemberPage = () => {
  const { data: treatments, isLoading } = useGetAllTreatments();

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Box>
      <CreateUpdateMember treatments={treatments} />
      <MemberCard />
    </Box>
  );
};

export default AdminMemberPage;
