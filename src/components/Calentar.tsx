import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { WORKING_DAYS, WORKING_HOURS } from "@/app/schedule";
import { Control, Controller } from "react-hook-form";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useGetAllAppointments } from "@/app/core/react-query/appointments/hooks/useGetAllAppointments";
import { AuthContext } from "@/providers/AuthProvider";

interface Appointment {
  appointmentId: string;
  userId: string;
  treatmentId: string;
  treatmentTitle: string;
  treatmentDescription: string;
  treatmentDuration: string;
  staffId: string;
  staffName: string;
  date: string;
  start: string;
  groupId: string;
}

interface CalendarProps {
  control: Control<any>;
  handleCalendarChange: (date: string, time: string) => void;
  selectedMemberId: string;
  totalDuration: () => number;
}

const Calendar = ({
  control,
  handleCalendarChange,
  selectedMemberId,
  totalDuration,
}: CalendarProps) => {
  const user = useContext(AuthContext);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week"));

  const treatmentsDuration = totalDuration();
  const { data, isLoading } = useGetAllAppointments();

  const memberAppointments = data?.data?.items.filter((appt: Appointment) => {
    return appt.staffId === selectedMemberId;
  });

  const userAppointments = memberAppointments?.filter((appt: Appointment) => {
    return appt.userId === user?.id;
  });

  const resetSelections = () => {
    setSelectedSlot("");
    setSelectedDay("");
    handleCalendarChange("", "");
  };

  const changeWeek = (weeksToAdd: number) => {
    const newWeek = currentWeek.clone().add(weeksToAdd, "week").startOf("week");
    setCurrentWeek(newWeek);
    resetSelections();
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setSelectedSlot("");
    handleCalendarChange(currentWeek.day(day).format("MM-DD-YYYY"), "");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedSlot(time);
    handleCalendarChange(
      currentWeek.day(selectedDay).format("MM-DD-YYYY"),
      time
    );
  };

  useEffect(() => {
    !!selectedMemberId === false ? resetSelections() : null;
    setSelectedSlot("");
  }, [selectedMemberId]);

  const getDateTime = (date: string, start: string) =>
    moment(date)
      .hour(Number(start.split(":")[0]))
      .minute(Number(start.split(":")[1]));

  const checkIfFits = (slotStartTime: string) => {
    const slotStart = currentWeek
      .day(selectedDay)
      .hour(Number(slotStartTime.split(":")[0]))
      .minute(Number(slotStartTime.split(":")[1]));

    const afterDurationSlotEnd = slotStart
      .clone()
      .add(treatmentsDuration, "minute");

    return !memberAppointments?.find((appt: Appointment) => {
      const existingStart = getDateTime(appt.date, appt.start);
      const existingEnd = existingStart
        .clone()
        .add(appt.treatmentDuration, "minute");
      return (
        slotStart.isBetween(existingStart, existingEnd) ||
        afterDurationSlotEnd.isBetween(existingStart, existingEnd) ||
        existingStart.isBetween(slotStart, afterDurationSlotEnd)
      );
    });
  };

  const isSlotBooked = (time: string) =>
    !!memberAppointments.find((appt: Appointment) => {
      const startDateTime = getDateTime(appt.date, appt.start);
      const endDateTime = startDateTime
        .clone()
        .add(appt.treatmentDuration, "minute");
      const slotDateTime = getDateTime(
        currentWeek.day(selectedDay).format("MM-DD-YYYY"),
        time
      );

      return (
        slotDateTime.isBetween(startDateTime, endDateTime) ||
        startDateTime.isSame(slotDateTime)
      );
    });

  const checkUserAppointment = (time: string) =>
    !!userAppointments.find((appt: Appointment) => {
      const startDateTime = getDateTime(appt.date, appt.start);
      const endDateTime = startDateTime
        .clone()
        .add(appt.treatmentDuration, "minute");
      const slotDateTime = getDateTime(
        currentWeek.day(selectedDay).format("MM-DD-YYYY"),
        time
      );

      return (
        slotDateTime.isBetween(startDateTime, endDateTime) ||
        startDateTime.isSame(slotDateTime)
      );
    });

  const isDateBeforeToday = (day: string) => {
    const calendarDate = currentWeek.day(day);
    const today = moment().startOf("D");

    return calendarDate.isBefore(today) && !calendarDate.isSame(today);
  };

  const isSlotBeforeNow = (time: string) => {
    const slotStart = currentWeek
      .day(selectedDay)
      .hour(Number(time.split(":")[0]))
      .minute(Number(time.split(":")[1]));
    const now = moment();

    return slotStart.isBefore(now);
  };

  useEffect(() => {
    if (!checkIfFits(selectedSlot)) {
      setSelectedSlot("");
      handleCalendarChange(
        currentWeek.day(selectedDay).format("MM-DD-YYYY"),
        ""
      );
    }
  }, [treatmentsDuration]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Box width="1024px" pr="8px">
      <Box justifyContent="center" display="flex" gap={2}>
        <Tooltip title="Previous week">
          <Box>
            <IconButton
              sx={{ width: "50px" }}
              disabled={currentWeek.isSame(moment().startOf("week"), "week")}
              onClick={() => changeWeek(-1)}
            >
              <ArrowCircleLeftOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Tooltip>

        {WORKING_DAYS.map((day) => {
          const isDateSelected = selectedDay === day ? "contained" : "outlined";
          const isDatePassed = isDateBeforeToday(day);
          return (
            <Controller
              key={day}
              name="date"
              control={control}
              render={({ field }) => (
                <Box>
                  <Button
                    disabled={!selectedMemberId || isDatePassed}
                    variant={isDateSelected}
                    onClick={() => handleDayChange(day)}
                  >
                    <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                      {day}
                      <br />
                      {currentWeek.day(day).format("MM-DD-YYYY")}
                    </Typography>
                  </Button>
                </Box>
              )}
            />
          );
        })}
        <Tooltip title="Next week">
          <IconButton sx={{ width: "50px" }} onClick={() => changeWeek(1)}>
            <ArrowCircleRightOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          width: "100%",
          maxWidth: "1024px",
          margin: "0 auto",
          padding: 2,
        }}
      >
        {selectedDay !== "" &&
          WORKING_HOURS.map((time) => {
            const isBooked = isSlotBooked(time);
            const ifFits = checkIfFits(time);
            const isBeforeNow = isSlotBeforeNow(time);
            const isUserAppointment = checkUserAppointment(time);

            let bgcolor = "whitesmoke";
            if (selectedSlot === time) {
              bgcolor = "lightgreen";
            }
            if (isBooked) {
              bgcolor = "#ff8a80";
            }
            if (isUserAppointment) {
              bgcolor = "lightblue";
            }

            return (
              <Controller
                name="start"
                control={control}
                key={time}
                render={() => (
                  <Box
                    display="flex"
                    key={time}
                    m={1}
                    bgcolor={bgcolor}
                    sx={{ borderRadius: "16px", alignItems: "center" }}
                  >
                    <Button
                      fullWidth
                      disabled={isBooked || !ifFits || isBeforeNow}
                      sx={{ fontSize: 24, borderRadius: "16px" }}
                      onClick={() => {
                        handleTimeSelect(time);
                      }}
                    >
                      <Typography>{time}</Typography>
                    </Button>
                  </Box>
                )}
              ></Controller>
            );
          })}
      </Box>
    </Box>
  );
};

export default Calendar;
