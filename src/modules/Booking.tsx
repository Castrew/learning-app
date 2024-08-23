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
import { useGetAllStaff } from "@/app/core/react-query/staff/hooks/useGetAllStaff";
import { useGetAllTreatments } from "@/app/core/react-query/treatments/hooks/useGetAllTreatmets";
import { useForm } from "react-hook-form";
import StaffList from "@/components/StaffList";
import TreatmentsList from "@/components/TreatmentList";
import Calendar from "@/components/Calentar";
import { Treatment } from "@/app/core/react-query/treatments/types";
import { useCreateAppointment } from "@/app/core/react-query/appointments/hooks/useCreateAppointment";
import ClearIcon from "@mui/icons-material/Clear";
import CircleIcon from "@mui/icons-material/Circle";
import { toasts } from "@/components/Toast";

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
  const { data: allStaff, isLoading: isLoadingAllStaff } = useGetAllStaff();
  const { data: allTreatments, isLoading: isLoadingAllTreatments } =
    useGetAllTreatments();

  const [open, setOpen] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [memberTreatments, setMemberTreatments] = useState<Treatment[]>([]);

  const staffMembers = allStaff?.data?.items;

  const filteredTreatments = allTreatments?.data.items.filter(
    (treatment: Treatment) =>
      memberTreatments
        ?.map((item: any) => item.treatmentId)
        .includes(treatment.id)
  );

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    getValues,
    formState: { dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      staffId: "",
      treatmentIds: [],
      date: "",
      start: "",
    },
  });

  const handleMemberChange = (member: MemberProps) => {
    reset();
    setMemberTreatments(member.treatments);
    setMemberName(member.name);
    setValue("staffId", member.id);
  };

  const handleCalendarChange = (date: string, time: string) => {
    setValue("date", date);
    setValue("start", time);
  };

  const appt = watch();

  const totalDuration = () => {
    const duration = filteredTreatments
      ?.filter((treatment: Treatment) =>
        appt.treatmentIds.includes(treatment.id)
      )
      .map((treatment: Treatment) => treatment.duration)
      .reduce((sum: number, duration: string) => sum + parseInt(duration), 0);
    return duration;
  };

  const selectedTreatments = allTreatments?.data.items.filter(
    (treatment: Treatment) =>
      appt.treatmentIds?.map((id: any) => id).includes(treatment.id)
  );

  const onSubmit = handleSubmit((data) => {
    createAppointment.mutate(data, {
      onSuccess: () => {
        toasts.Success("Your appointment has been set!");
        setOpen(!open);
        // handleMemberChange({ id: "", name: "", treatments: [] });
      },
      onError: () => {
        toasts.Error("Something went wrong");
        setOpen(!open);
      },
    });
  });

  if (isLoadingAllStaff || isLoadingAllTreatments) {
    return "Loading...";
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        overflow: "auto",
        mt: 2,
        mb: 2,
        height: "100%",
        width: "100%",
      }}
    >
      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex" }}>
          <StaffList
            staffMembers={staffMembers}
            handleMemberChange={handleMemberChange}
          />
          <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

          {memberTreatments.length !== 0 && (
            <TreatmentsList treatments={filteredTreatments} control={control} />
          )}
          <Calendar
            totalDuration={totalDuration}
            control={control}
            handleCalendarChange={handleCalendarChange}
            selectedMemberId={appt.staffId}
          />
          <Button
            sx={{ height: "50px", mr: 2 }}
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
                  Selected treatments:{" "}
                </Typography>
                {selectedTreatments.map((treatment: Treatment) => {
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
    </Box>
  );
};

export default Booking;
