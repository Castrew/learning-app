"use client";

import { Box, Typography, alpha } from "@mui/material";
import { MemberProps } from "@/modules/Booking";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import marsi from "../../public/marsi.png";
import dimoff from "../../public/dimoff.png";
import { Controller, useFormContext } from "react-hook-form";

interface StaffListProps {
  staffMembers: MemberProps[];
  handleMemberChange: (member: MemberProps) => void;
}

const StaffList = ({ staffMembers, handleMemberChange }: StaffListProps) => {
  const { control } = useFormContext();

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      width="1024px"
      minWidth="200px"
      mb="8px"
    >
      {staffMembers?.map((member: MemberProps, index) => (
        <Controller
          name="staffId"
          key={member.id}
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                backgroundColor:
                  field.value === member.id ? "#f06292" : "inherit",
                color: field.value === member.id ? "white" : "inherit",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    field.value === member.id ? "#e91e63" : "#f06292",
                },
              }}
              position="relative"
              key={member.id}
            >
              <Image
                id={`member-${index}`}
                onClick={() => {
                  handleMemberChange(member);
                }}
                src={index === 0 ? marsi : dimoff}
                width={250}
                height={300}
                alt={index === 0 ? "marsi" : "dimoff"}
              />
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 11.5,
                  left: 5,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                }}
              >
                {member.name}
              </Typography>
              {field.value === member.id && (
                <CloseIcon
                  sx={{
                    position: "absolute",
                    top: 11.5,
                    right: 5,
                    borderRadius: "50%",
                    backgroundColor: alpha("#000", 0.1),
                    p: "5px",
                    width: "34px",
                    height: "34px",
                    "&:hover": {
                      bgcolor: alpha("#000", 0.5),
                      cursor: "pointer",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMemberChange({ id: "", name: "", treatments: [] });
                  }}
                />
              )}
            </Box>
          )}
        />
      ))}
    </Box>
  );
};

export default StaffList;
