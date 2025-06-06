"use client";

import { useDeleteTreatment } from "src/core/react-query/treatments/hooks/useDeleteTreatment";
import { useGetAllTreatments } from "src/core/react-query/treatments/hooks/useGetAllTreatmets";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import parse from "html-react-parser";
import { toasts } from "./Toast";

type treatmentProps = {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
};

export const TreatmentList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: treatments, isLoading } = useGetAllTreatments();
  const deleteTreatment = useDeleteTreatment();
  const isActionAllowed = true && pathname.includes("/admin");

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Box>
      <Typography sx={{ fontSize: 24 }}>Treatmets List</Typography>
      {isActionAllowed && (
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
                <Box sx={{ mb: 1 }} color="text.secondary">
                  Description: {parse(treatment.description)}
                </Box>
              </CardContent>
              {isActionAllowed && (
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
                      deleteTreatment.mutate(
                        {
                          treatmentId: treatment.id,
                        },
                        {
                          onSuccess: () =>
                            toasts.Success("Treatment deleted successfuly"),
                        }
                      )
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
    </Box>
  );
};
