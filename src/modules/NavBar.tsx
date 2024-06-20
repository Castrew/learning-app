import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";


const NavBar = () => {
  const router = useRouter();

  return (
    <AppBar position="static" color="info">
      <Toolbar>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() => router.push("/")}
        >
          Home
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() => router.push("/booking")}
        >
          Appointment
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          sx={{ mr: 2, borderRadius: "20px" }}
          onClick={() => router.push("/treatments")}
        >
          Treatments
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <ProfileDropdown />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
