"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";
import forbidden from "../../../public/forbidden.png";
import { useRouter } from "next/navigation";

const notAuthorized = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // minHeight: "100vh",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Image src={forbidden} width="900" height="350" alt="Forbidden" />
      </Box>
      <Button variant="contained" onClick={() => router.push("/")}>
        Back to Home
      </Button>
    </Box>
  );
};

export default notAuthorized;
