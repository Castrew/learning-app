"use-client"

import { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar, Typography } from "@mui/material";
import { signOut } from "../../actions/auth.actions";
import { useRouter } from "next/navigation";

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="profile"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar alt="Profile" />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            signOut();
            router.push("/sign-in");
          }}
        >
          <Typography color="error">Sign out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
