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
<<<<<<< Updated upstream
  const deleteTreatments = useDeleteTreatment();
  const treatments = data?.data.items;
=======
  const deleteTreatment = useDeleteTreatment();
  const treatments = data?.data?.items;
>>>>>>> Stashed changes

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Box>
      <Typography sx={{ fontSize: 24 }}>Treatmets List</Typography>
<<<<<<< Updated upstream
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
=======
      {isAdmin && (
        <Button
          variant="contained"
          size="medium"
          sx={{
            borderRadius: "20px",
            m: 2,
            maxWidth: "200px",
          }}
          onClick={() => router.push("/admin/treatments/create")}
        >
          Create Treatment
        </Button>
      )}
      <Box display="flex" flexWrap="wrap" gap={1}>
        {treatments?.map((treatment: treatmentProps) => {
          return (
            <Card
              key={treatment.id}
              variant="outlined"
              sx={{ width: "calc((100vw - 36px)/ 3) " }}
            >
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
>>>>>>> Stashed changes
    </Box>
  );
};
