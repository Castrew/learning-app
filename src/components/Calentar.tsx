import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { WORKING_DAYS, WORKING_HOURS } from "@/app/schedule";
import { UseFormRegister } from "react-hook-form";

interface CalendarProps {
  register: UseFormRegister<any>;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: string;
}

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week"));

  // console.log(
  //   selectedDay,
  //   selectedTime,
  //   currentWeek.day(selectedDay).format("DD/MM/YYYY")
  // );

  // const workingHours = Array.from({ length: 18 }, (_, i) =>
  //   moment({ hour: 9 })
  //     .add(30 * i, "minutes")
  //     .format("HH:mm")
  // );

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setSelectedTime("");
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.clone().add(1, "week").startOf("week"));
    setSelectedDay("");
    setSelectedTime("");
  };

  // console.log(workingHours);

  return (
    <Box>
      <Box flexWrap="wrap" display="flex" gap={2}>
        {WORKING_DAYS.map((day) => {
          const isSelected = selectedDay === day ? "contained" : "outlined";

          return (
            <Box>
              {/* <input hidden {...register("date")} /> */}
              <Button
                key={day}
                variant={isSelected}
                onClick={() => handleDayChange(day)}
              >
                <Typography>
                  {day}: {currentWeek.day(day).format("DD-MM-YYYY")}
                </Typography>
              </Button>
            </Box>
          );
        })}
        <Button onClick={() => handleNextWeek()}>Next week</Button>
      </Box>
      {selectedDay !== "" &&
        WORKING_HOURS.map((time) => {
          return (
            <Box m={1} bgcolor="lightgreen">
              <Button
                sx={{ fontSize: 24 }}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            </Box>
          );
        })}
    </Box>
  );
};

export default Calendar;
