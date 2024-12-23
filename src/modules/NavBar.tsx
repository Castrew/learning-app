"use client";

import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import ProfileDropdown from "src/components/ProfileDropdown";
import { useContext } from "react";
import { AuthContext } from "src/providers/AuthProvider";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useContext(AuthContext);

  const isAdmin = user?.id === "yvli5wewb2blxy5";
  const isAccessAllowed = true && pathname.includes("/admin");

  return (
    <AppBar position="static" color="info">
      <Toolbar>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() =>
            isAccessAllowed ? router.push("/admin") : router.push("/")
          }
        >
          Home
        </Button>
        <Button
          id="navbar-appointment-button"
          variant="contained"
          size="large"
          color="error"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() =>
            isAccessAllowed
              ? router.push("/admin/booking")
              : router.push("/booking")
          }
        >
          Appointment
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() =>
            isAccessAllowed
              ? router.push("/admin/treatments")
              : router.push("/treatments")
          }
        >
          Treatments
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() =>
            isAccessAllowed
              ? router.push("/admin/staff")
              : router.push("/staff")
          }
        >
          Staff
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {isAdmin && (
          <Button
            size="large"
            variant="contained"
            color="error"
            sx={{ mr: 2, borderRadius: "20px" }}
            onClick={() =>
              pathname.includes("/admin")
                ? router.push("/")
                : router.push("/admin")
            }
          >
            {pathname.includes("/admin") ? "Back to Home" : "Admin Panel"}
          </Button>
        )}
        <ProfileDropdown />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
