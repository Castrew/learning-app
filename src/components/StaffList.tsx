"use client";

import { Box, Typography, alpha } from "@mui/material";
import { MemberProps } from "@/modules/Booking";
import { useState } from "react";
import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import marsi from "../../public/marsi.png";

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
    <Box
      display="flex"
      justifyContent="space-evenly"
      width="1024px"
      minWidth="200px"
      mb="8px"
    >
      {staffMembers?.map((member) => (
        <Box
          sx={{
            backgroundColor:
              selectedMemberId === member.id ? "#f06292" : "inherit",
            color: selectedMemberId === member.id ? "white" : "inherit",
            "&:hover": {
              cursor: "pointer",
              backgroundColor:
                selectedMemberId === member.id ? "#e91e63" : "#f06292",
            },
          }}
          position="relative"
          key={member.id}
        >
          <Image
            onClick={() => handleButtonClick(member)}
            src={marsi}
            width={250}
            height={300}
            alt="marsi"
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
          {selectedMemberId === member.id && (
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
                "&:hover": { bgcolor: alpha("#000", 0.5), cursor: "pointer" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSelectedMember();
              }}
            />
          )}
        </Box>

        // <Box key={member.id} sx={{ width: "250px", position: "relative" }}>
        //   <Button
        //     fullWidth
        //     onClick={() => handleButtonClick(member)}
        //     sx={{
        //       backgroundColor:
        //         selectedMemberId === member.id ? "#f06292" : "inherit",
        //       color: selectedMemberId === member.id ? "white" : "inherit",
        //       "&:hover": {
        //         backgroundColor:
        //           selectedMemberId === member.id ? "#e91e63" : "#f06292",
        //       },
        //       ".MuiButton-endIcon": { position: "absolute", right: 0, mr: 0.5 },
        //     }}
        //     endIcon={
        //       selectedMemberId === member.id && (
        //         <CloseIcon
        //           sx={{
        //             borderRadius: "50%",
        //             p: "5px",
        //             width: "34px",
        //             height: "34px",
        //             "&:hover": { bgcolor: alpha("#000", 0.01) },
        //           }}
        //           onClick={(e) => {
        //             e.stopPropagation();
        //             handleRemoveSelectedMember();
        //           }}
        //         />
        //       )
        //     }
        //   >
        //     <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
        //       {member.name}
        //     </Typography>
        //   </Button>
        // </Box>
      ))}
    </Box>
  );
};

export default StaffList;
