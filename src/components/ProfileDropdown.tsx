"use client";

import { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { signIn, signOut, useSession } from "next-auth/react";

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const pathName = usePathname();

  if (!session && status !== "loading") {
    return (
      <Button
        variant="contained"
        onClick={() =>
          signIn("google", {
            callbackUrl: pathName,
          })
        }
        sx={{ mr: 2 }}
      >
        Log in
      </Button>
    );
  }

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
            // router.push("/sign-in");
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
