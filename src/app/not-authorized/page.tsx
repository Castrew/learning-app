"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import accessDenied from "../../../public/accessDenied.png";
import Image from "next/image";

const NotAuthorized = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "pink",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        // bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: "pink",
          borderRadius: 1,
          textAlign: "center",
        }}
      >
        <Image
          src={accessDenied}
          alt="Access Denied"
          width={1000}
          height={400}
        />
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/")}
          >
            Go Back to Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotAuthorized;
