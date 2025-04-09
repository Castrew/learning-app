"use client";

import { useParams } from "next/navigation";
import CreateUpdateTreatment from "src/components/CreateUpdateTreatment";
import { useGetOneTreatment } from "src/core/react-query/treatments/hooks/useGetOneTreatment";

const AdminUpdateTreatmentPage = () => {
  const params = useParams();
  const treatmentId = String(params.treatmentId);
  const { data: treatment, isLoading } = useGetOneTreatment({ treatmentId });

  if (isLoading) {
    return "Loading...";
  }

  return <CreateUpdateTreatment treatment={treatment} />;
};

export default AdminUpdateTreatmentPage;
