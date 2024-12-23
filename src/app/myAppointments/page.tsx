"use client";

import {
  Box,
  Card,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "src/providers/AuthProvider";
import { useGetUserAppointments } from "../core/react-query/appointments/hooks/useGetUserAppointments";
import { GroupedAppointment } from "../core/react-query/appointments/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Switch from "@mui/material/Switch";
import { useRouter } from "next/navigation";
import { useUpdateAppointment } from "../core/react-query/appointments/hooks/useUpdateAppointment";
import { toasts } from "src/components/Toast";
import { useDeleteAppointmentGroup } from "../core/react-query/appointments/hooks/useDeleteAppointmentGroup";
import DeleteIcon from "@mui/icons-material/Delete";

const MyAppointmentsPage = () => {
  const user = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const updateAppointment = useUpdateAppointment();
  const router = useRouter();
  const { data: userAppts, isLoading } = useGetUserAppointments({
    userId: user?.id,
  });
  const deleteAppointmentGroup = useDeleteAppointmentGroup();

  const handleUpdateAppointment = (apptId, groupId, treatmentId) => {
    updateAppointment.mutate(
      { apptId, groupId, treatmentId },
      {
        onSuccess: () => toasts.Success("You removed this succesfully"),
      }
    );
  };

  const handleDeleteGroupAppt = (data: { apptId: string }) => {
    deleteAppointmentGroup.mutate(data, {
      onSuccess: () => toasts.Success("Group appointment removed successfuly"),
    });
  };

  if (isLoading || !user) {
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
          <Switch
            id="appointment-edit-switch"
            checked={edit}
            onChange={() => setEdit(!edit)}
          />
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" mt={2} gap={1}>
        {userAppts?.map((appt: GroupedAppointment, index) => {
          return (
            <Card
              sx={{
                p: 2,
                width: "calc((100vw - 36px)/ 3) ",
                position: "relative",
              }}
            >
              <Typography>Set with: {appt.staffName}</Typography>
              <Typography>Date: {appt.treatments[0].date}</Typography>
              <Typography fontWeight="bold">Treatments</Typography>
              {appt.treatments.map((treatment, index) => {
                return (
                  <Box display="flex" flexDirection="row">
                    {edit && (
                      <Tooltip title="Remove Treatment">
                        <IconButton
                          id={`delete-treatment-${index}`}
                          onClick={() =>
                            handleUpdateAppointment(
                              treatment.appointmentId,
                              appt.groupId,
                              treatment.treatmentId
                            )
                          }
                        >
                          <RemoveCircleOutlineIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Typography ml={1}>
                      {treatment.treatmentTitle} at {treatment.start}
                    </Typography>
                  </Box>
                );
              })}
              {edit && (
                <Tooltip title="Delete Appointment Group">
                  <IconButton
                    id={`delete-appointment-${index}`}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() =>
                      handleDeleteGroupAppt({
                        apptId: appt.treatments[0].appointmentId,
                      })
                    }
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              )}
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
