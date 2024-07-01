"use client";

import { useDeleteTreatment } from "@/app/core/react-query/treatments/hooks/useDeleteTreatment";
import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";

type treatmentProps = {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
};

type isAdminProps = {
  isAdmin?: boolean;
};

export const TreatmentsList = ({ isAdmin }: isAdminProps) => {
  const router = useRouter();
  const { data, isLoading } = useGetAllTreatments();
  const deleteTreatment = useDeleteTreatment();
  const treatments = data?.data.items;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Box display="flex" flexDirection="column">
      <Typography sx={{ fontSize: 24 }}>Treatmets List</Typography>
      {treatments?.map((treatment: treatmentProps) => {
        return (
          <Card key={treatment.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Procedura: {treatment.title}
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Vremetraene: {treatment.duration}
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Cena: {treatment.price}
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Description: {parse(treatment.description)}
              </Typography>
            </CardContent>
            {isAdmin && (
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ borderRadius: "20px" }}
                  onClick={() =>
                    router.push(`/admin/treatments/${treatment.id}`)
                  }
                >
                  Update
                </Button>
                <Button
                  size="medium"
                  color="error"
                  variant="outlined"
                  onClick={() =>
                    deleteTreatment.mutate({
                      treatmentId: treatment.id,
                    })
                  }
                >
                  Delete
                </Button>
              </CardActions>
            )}
          </Card>
        );
      })}
    </Box>
  );
};
