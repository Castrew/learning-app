"use client";

import { Box, Button, Typography, alpha } from "@mui/material";
import { MemberProps } from "@/modules/Booking";
import { UseFormRegister } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface StaffListProps {
  staffMembers: MemberProps[];
  handleMemberChange: (member: MemberProps) => void;
}

const StaffList = ({ staffMembers, handleMemberChange }: StaffListProps) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleButtonClick = (member: MemberProps) => {
    setSelectedMemberId(member.id);
    handleMemberChange(member);
  };

  const handleRemoveSelectedMember = () => {
    setSelectedMemberId(null);
    handleMemberChange({ id: "", name: "", treatments: [] });
  };

  return (
    <Box width="200px" minWidth="200px">
      {staffMembers?.map((member) => (
        <Box
          key={member.id}
          sx={{ marginBottom: "16px", position: "relative" }}
        >
          <Button
            fullWidth
            onClick={() => handleButtonClick(member)}
            sx={{
              backgroundColor:
                selectedMemberId === member.id ? "primary.main" : "inherit",
              color: selectedMemberId === member.id ? "white" : "inherit",
              "&:hover": {
                backgroundColor:
                  selectedMemberId === member.id ? "primary.dark" : "inherit",
              },
              ".MuiButton-endIcon": { position: "absolute", right: 0, mr: 0.5 },
            }}
            endIcon={
              selectedMemberId === member.id && (
                <CloseIcon
                  sx={{
                    borderRadius: "50%",
                    p: "5px",
                    width: "34px",
                    height: "34px",
                    "&:hover": { bgcolor: alpha("#000", 0.01) },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSelectedMember();
                  }}
                />
              )
            }
          >
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              {member.name}
            </Typography>
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default StaffList;
