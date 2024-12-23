"use client";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetAllStaff } from "src/app/core/react-query/staff/hooks/useGetAllStaff";
import { useForm, FormProvider } from "react-hook-form";
import StaffList from "src/components/StaffList";
import TreatmentsList from "src/components/TreatmentList";
import Calendar from "src/components/Calentar";
import { Treatment } from "src/app/core/react-query/treatments/types";
import { useCreateAppointment } from "src/app/core/react-query/appointments/hooks/useCreateAppointment";
import ClearIcon from "@mui/icons-material/Clear";
import CircleIcon from "@mui/icons-material/Circle";
import { toasts } from "src/components/Toast";

export interface MemberProps {
  id: string;
  name: string;
  treatments: Treatment[];
}

export interface FormValues {
  staffId: string;
  treatmentIds: string[];
  date: string;
  start: string;
}

const Booking = () => {
  const createAppointment = useCreateAppointment();
  const { data: staffMembers, isLoading: isLoadingAllStaff } = useGetAllStaff();

  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberTreatments, setMemberTreatments] = useState<Treatment[]>([]);

  const defaultValues = {
    staffId: "",
    treatmentIds: [],
    date: "",
    start: "",
  };

  const formContext = useForm<FormValues>({
    defaultValues,
  });

  const handleMemberChange = (member: MemberProps) => {
    formContext.reset();
    setMemberTreatments(member.treatments);
    setMemberName(member.name);
    formContext.setValue("staffId", member.id);
  };

  const appt = formContext.watch();

  const totalDuration = () => {
    const duration = memberTreatments
      ?.filter((treatment: Treatment) =>
        appt.treatmentIds.includes(treatment.id)
      )
      .map((treatment: Treatment) => treatment.duration)
      .reduce((sum: number, duration: string) => sum + parseInt(duration), 0);
    return duration;
  };

  const selectedTreatments = memberTreatments.filter((treatment: Treatment) =>
    appt.treatmentIds?.map((id: string) => id).includes(treatment.id)
  );

  const onSubmit = formContext.handleSubmit((data) => {
    console.log(data);

    createAppointment.mutate(data, {
      onSuccess: () => {
        toasts.Success("Your appointment has been set!");
        setOpen(!open);
      },
      onError: () => {
        toasts.Error("Something went wrong");
        setOpen(!open);
      },
    });
  });

  if (isLoadingAllStaff) {
    return "Loading...";
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",

        mt: 2,
        mb: 2,
        height: "100%",
        width: "100%",
      }}
    >
      <FormProvider {...formContext}>
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StaffList
              staffMembers={staffMembers}
              handleMemberChange={handleMemberChange}
            />
            <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

            {memberTreatments.length !== 0 && (
              <TreatmentsList
                treatments={memberTreatments}
                control={formContext.control}
              />
            )}
            {appt.staffId && (
              <Calendar
                totalDuration={totalDuration}
                selectedMemberId={appt.staffId}
              />
            )}
            <Button
              id="appointment-confirmation-modal"
              sx={{
                height: "50px",
                px: 4,
                mr: 2,
                borderRadius: "20px",
                bgcolor: "#f06292",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              disabled={!(appt.treatmentIds.length !== 0 && appt.start !== "")}
              onClick={() => {
                setOpen(true);
              }}
            >
              Set Appointment
            </Button>
            <Modal open={open}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 500,
                  bgcolor: "background.paper",
                  border: "1px solid #000",
                  borderRadius: 10,
                  boxShadow: 24,
                  p: 2,
                }}
              >
                <DialogTitle
                  variant="h5"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pr: 1, fontSize: 20, fontWeight: "bold" }}
                >
                  Confirmation
                  <IconButton
                    aria-label="close-modal"
                    onClick={() => setOpen(!open)}
                  >
                    <ClearIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Typography>{`Set appointment with ${memberName}, for ${appt.date} at ${appt.start}?`}</Typography>
                  <Typography mt={1} mb={1}>
                    Selected treatments:
                  </Typography>
                  {selectedTreatments?.map((treatment: Treatment) => {
                    return (
                      <Box
                        key={treatment.id}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <CircleIcon fontSize="small" />
                        <Typography pt="2px" ml="4px">
                          {treatment.title}
                        </Typography>
                      </Box>
                    );
                  })}
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{ borderRadius: "20px" }}
                    onClick={() => setOpen(!open)}
                  >
                    Close modal
                  </Button>
                  <Button
                    id="submit-appointment-button"
                    sx={{ borderRadius: "20px" }}
                    variant="contained"
                    onClick={onSubmit}
                  >
                    Set appointment
                  </Button>
                </DialogActions>
              </Box>
            </Modal>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Booking;
