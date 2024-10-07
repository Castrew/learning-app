"use client";

import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { signOut } from "../../actions/auth.actions";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  return (
    <Box>
      <IconButton
        id="profile-dropdown"
        edge="end"
        aria-label="profile"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <Avatar alt="Profile" />
      </IconButton>
      <Menu
        id="profile-dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          id="profile-dropdown-option"
          onClick={() => {
            setAnchorEl(null);
            router.push("/myAppointments");
          }}
        >
          <CalendarMonthIcon />
          <Typography ml={1}>My appointments</Typography>
        </MenuItem>
        <MenuItem
          id="profile-dropdown-option"
          onClick={() => {
            setAnchorEl(null);
            signOut();
            router.push("/sign-in");
          }}
        >
          <LogoutIcon color="error" />
          <Typography ml={1} color="error">
            Sign out
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;
