"use client";

import { Box, Card, IconButton, Link, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useGetUserAppointments } from "../core/react-query/appointments/hooks/useGetUserAppointments";
import {
  GroupedAppointment,
  GroupedTreatment,
} from "../core/react-query/appointments/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/navigation";
import { useUpdateAppointment } from "../core/react-query/appointments/hooks/useUpdateAppointment";
import { toasts } from "@/components/Toast";

// type DataProps = {
//   groupId: string;
//   treatmentId: string;
//   apptId: string;
// };

const MyAppointmentsPage = () => {
  const user = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const updateAppointment = useUpdateAppointment();
  const router = useRouter();
  const { data: userAppts, isLoading } = useGetUserAppointments({
    userId: user.id,
  });

  const test = (apptId, groupId, treatmentId) => {
    updateAppointment.mutate(
      { apptId, groupId, treatmentId },
      {
        onSuccess: () => toasts.Success("You removed this succesfully"),
      }
    );
  };

  if (isLoading) {
    return "Loading...";
  }

  return userAppts.length !== 0 ? (
    <Box display="flex" flexDirection="column" mt={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography alignSelf="center" sx={{ fontSize: 24 }}>
          My appotments
        </Typography>
        <Box display="flex">
          <Typography mt={1}>Edit mode</Typography>
          <Switch checked={edit} onChange={() => setEdit(!edit)} />
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" mt={2} gap={1}>
        {userAppts?.map((appt: GroupedAppointment) => {
          return (
            <Card sx={{ p: 2, width: "calc((100vw - 36px)/ 3) " }}>
              <Typography>Set with: {appt.staffName}</Typography>
              <Typography>Date: {appt.treatments[0].date}</Typography>
              <Typography fontWeight="bold">Treatments</Typography>
              {appt.treatments.map((treatment) => {
                return (
                  <Box display="flex" flexDirection="row">
                    {edit && (
                      <IconButton
                        onClick={() =>
                          test(
                            treatment.appointmentId,
                            appt.groupId,
                            treatment.treatmentId
                          )
                        }
                      >
                        <RemoveCircleOutlineIcon color="error" />
                      </IconButton>
                    )}
                    <Typography ml={1}>
                      {treatment.treatmentTitle} at {treatment.start}
                    </Typography>
                  </Box>
                );
              })}
            </Card>
          );
        })}
      </Box>
    </Box>
  ) : (
    <Box mt={6} display="flex" alignItems="center" flexDirection="column">
      <Typography>
        Opps... It seems that you don't have appointment yet!
      </Typography>
      <Link
        sx={{ "&:hover": { cursor: "pointer" } }}
        onClick={() => router.push("/booking")}
      >
        <Typography>Set appointment here!</Typography>
      </Link>
    </Box>
  );
};

export default MyAppointmentsPage;
