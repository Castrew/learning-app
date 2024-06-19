import { AppBar, Box, Button, Toolbar } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Appointment</Button>
        <Button color="inherit">Treatments</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
