import { useGetPaginatedAppointments } from "@/app/core/react-query/appointments/hooks/useGetPaginatedAppointments";
import {
  Box,
  Button,
  Card,
  CardContent,
  Pagination,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/app/helper/createURLqueryString";
import { GroupedAppointment } from "@/app/api/appointments/route";

export const AppointmentCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useGetPaginatedAppointments({
    page: String(searchParams.get("page")),
    pageSize: String(searchParams.get("pageSize")),
  });

  if (isLoading) {
    return;
  }

  const { pagination, combinedAppointmentsByGroup } = data;

  return (
    <Box
      width="100%"
      height="calc(100% - 64px)"
      display="flex"
      position="relative"
      my={2}
      justifyContent="center"
      flexDirection="row"
      alignItems="center"
    >
      {combinedAppointmentsByGroup.map((appt: GroupedAppointment) => {
        return (
          <Box m={1}>
            <Card
              sx={{ width: "300px", minHeight: "200px" }}
              key={appt.appointmentId}
            >
              <CardContent>
                <Typography>Set by:{appt.username}</Typography>
                <Typography>With:{appt.staffName}</Typography>
                {appt.treatments.map((treatment) => {
                  return (
                    <Typography key={treatment.treatmentId}>
                      {treatment.treatmentTitle} for {treatment.date} at{" "}
                      {treatment.start}
                    </Typography>
                  );
                })}
              </CardContent>
            </Card>
          </Box>
        );
      })}
      <Pagination
        sx={{ position: "absolute", bottom: 0 }}
        page={Number(searchParams.get("page")) ?? pagination.totalPages}
        count={pagination.totalPages}
        onChange={(e, p) => {
          const newQueryString = createQueryString(
            searchParams,
            "page",
            String(p)
          );

          router.push(pathname + newQueryString);
        }}
      />
    </Box>
  );
};
