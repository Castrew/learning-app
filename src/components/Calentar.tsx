import { Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";

interface CalendarProps {
  selectedTreatments?: string[];
}

const Calendar: React.FC<CalendarProps> = () => {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  // const { mutate: fetchSlots } = useMutation(
  //   () => fetchAvailableSlots(selectedTreatments),
  //   {
  //     onSuccess: (data) => {
  //       setAvailableSlots(data);
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (selectedTreatments.length > 0) {
  //     fetchSlots();
  //   }
  // }, [selectedTreatments, fetchSlots]);

  const startHour = 10;
  const endHour = 18;
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(moment({ hour, minute }).format("HH:mm"));
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const today = moment();
  const startOfWeek = today.clone().startOf("isoWeek");
  const days = [];
  for (let i = 0; i < 5; i++) {
    days.push(startOfWeek.clone().add(i, "days"));
  }

  return (
    <Grid container spacing={2}>
      {days.map((day, dayIndex) => (
        <Grid item xs={2} key={dayIndex}>
          <Typography variant="h6">{day.format("dddd")}</Typography>
          <Typography variant="body1">{day.format("MM/DD/YYYY")}</Typography>
          {timeSlots.map((slot, index) => {
            const slotTime = moment(`${day.format("YYYY-MM-DD")} ${slot}`);
            const isPast = slotTime.isBefore(moment());
            const isAvailable = availableSlots.includes(slot);
            return (
              <Paper
                key={index}
                style={{
                  height: "50px",
                  backgroundColor: isAvailable && !isPast ? "green" : "white",
                  color: isPast ? "grey" : "black",
                  textAlign: "center",
                  lineHeight: "50px",
                }}
              >
                {slot}
              </Paper>
            );
          })}
        </Grid>
      ))}
    </Grid>
  );
};

export default Calendar;
