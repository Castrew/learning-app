"use client";

import CreateUpdateMember from "src/components/CreateUpdateMember";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useGetOneStaff } from "src/core/react-query/staff/hooks/useGetOneStaff";
import { useGetAllTreatments } from "src/core/react-query/treatments/hooks/useGetAllTreatmets";

const CreateMemberPage = () => {
  const params = useParams();
  const staffId = String(params?.staffId);
  const { data: member, isLoading: isOneMemeberLoading } = useGetOneStaff({
    staffId,
  });
  const { data: treatments, isLoading: isLoadingAllTreatments } =
    useGetAllTreatments();

  const memberTreatmentsIds = member?.treatments.map((treatment) => {
    return treatment.id;
  });

  if (isLoadingAllTreatments || isOneMemeberLoading) {
    return "Loading...";
  }
  return (
    <CreateUpdateMember
      member={member}
      treatments={treatments}
      memberTreatmentsIds={memberTreatmentsIds}
    />
  );
};

export default CreateMemberPage;
