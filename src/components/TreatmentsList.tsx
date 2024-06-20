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
    return <Typography>Loading...</Typography>;
  }
  return (
    <Box display="flex" flexDirection="column">
      <Typography sx={{ fontSize: 24 }}>Treatmets List</Typography>
      {treatments?.map((treatment: treatmentProps) => {
        return (
          <Card variant="outlined" sx={{ mb: 2 }}>
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
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: "20px" }}
              >
                Update
              </Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
};
