"use client";

import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useContext(AuthContext);

  const isAdmin = user?.id === "16aafx78kvkvgt2";
  const isAccessAllowed = isAdmin && pathname.includes("/admin");

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
