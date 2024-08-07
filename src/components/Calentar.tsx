import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { WORKING_DAYS, WORKING_HOURS } from "@/app/schedule";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

interface CalendarProps {
  control: Control<any>;
  handleCalendarChange: (date: string, time: string) => void;
  isSelectedMember: boolean;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: string;
}

const Calendar = ({
  control,
  handleCalendarChange,
  isSelectedMember,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("week"));

  const resetSelections = () => {
    setSelectedDate("");
    handleCalendarChange("", "");
  };

  const changeWeek = (weeksToAdd: number) => {
    const newWeek = currentWeek.clone().add(weeksToAdd, "week").startOf("week");
    setCurrentWeek(newWeek);
    resetSelections();
  };

  const handleDayChange = (day: string) => {
    setSelectedDate(day);
    handleCalendarChange(currentWeek.day(day).format("DD-MM-YYYY"), "");
  };

  const handleTimeSelect = (time: string) => {
    handleCalendarChange(
      currentWeek.day(selectedDate).format("DD-MM-YYYY"),
      time
    );
  };

  useEffect(() => {
    isSelectedMember === false ? setSelectedDate("") : null;
  }, [isSelectedMember]);

  return (
    <Box>
      <Box flexWrap="wrap" display="flex" gap={2}>
        <Tooltip title="Previous week">
          <IconButton
            sx={{ width: "50px" }}
            disabled={currentWeek.isSame(moment().startOf("week"), "week")}
            onClick={() => changeWeek(-1)}
          >
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        {WORKING_DAYS.map((day) => {
          const isDateSelected =
            selectedDate === day ? "contained" : "outlined";

          return (
            <Box key={day}>
              <Controller
                name="selectedDate"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Button
                      variant={isDateSelected}
                      onClick={() => handleDayChange(day)}
                    >
                      <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                        {day}
                        <br />
                        {currentWeek.day(day).format("DD-MM-YYYY")}
                      </Typography>
                    </Button>
                  </Box>
                )}
              ></Controller>
            </Box>
          );
        })}
        <Tooltip title="Previous week">
          <IconButton sx={{ width: "50px" }} onClick={() => changeWeek(1)}>
            <ArrowCircleRightOutlinedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      {selectedDate !== "" &&
        WORKING_HOURS.map((time) => {
          return (
            <Box key={time} m={1} bgcolor="lightgreen">
              <Controller
                name="selectedTime"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Button
                      sx={{ fontSize: 24 }}
                      onClick={() => handleTimeSelect(time)}
                    >
                      <Typography>{time}</Typography>
                    </Button>
                  </Box>
                )}
              ></Controller>
            </Box>
          );
        })}
    </Box>
  );
};

export default Calendar;
