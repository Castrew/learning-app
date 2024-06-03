"use client";

import { useDeleteTreatment } from "@/app/core/react-query/treatments/hooks/useDeleteTreatment";
import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

type treatmentProps = {
  id: number;
  title: string;
  duration: string;
  price: string;
};

export const TreatmentsList = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllTreatments();
  const deleteTreatments = useDeleteTreatment();
  const treatments = data?.data.items;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Box display="flex" flexDirection="column">
      Treatmets List
      {treatments?.map((treatment: treatmentProps) => {
        return (
          <Box key={treatment?.id}>
            <h1>Procedura {treatment?.title}</h1>
            <h4>Vremetraene {treatment?.duration}</h4>
            <h4>Cena {treatment?.price}</h4>
            <Button
              onClick={() => router.push(`/admin/treatments/${treatment.id}`)}
            >
              Update
            </Button>
            <Button
              onClick={() =>
                deleteTreatments.mutate({ treatmentId: treatment.id })
              }
            >
              Delete
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};
