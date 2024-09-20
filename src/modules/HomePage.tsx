"use client";

import React, { Suspense } from "react";
import { Box, Link, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo.png";
import MemberCard from "@/components/MemberCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
type TestProps = {
  nailon: number;
  boq: number;
  razreditel: number;
  chasove: number;
};

export const HomePage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ mt: 2 }} width="100%" flexDirection="column">
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="center"
        sx={{ gap: isMobile ? 3 : 5 }}
        p={2}
      >
        <Box
          sx={{
            m: "auto",
            maxWidth: "400px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Typography
            id="company-name"
            sx={{
              fontFamily: "cursive",
              fontSize: isMobile ? "48px" : "64px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              letterSpacing: "3px",
            }}
          >
            POUR ELLE
          </Typography>
          <Typography
            sx={{
              fontFamily: "cursive",
              fontSize: isMobile ? "18px" : "23px",
            }}
          >
            WHERE NAILS TELL YOUR STORY
          </Typography>
        </Box>

        <Box
          sx={{
            width: isMobile ? "80%" : "auto",
            height: "auto",
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
          }}
        >
          <Image
            src={logo}
            alt="logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>
      <Typography
        id="first-paragraph"
        sx={{
          pt: 5,
          maxWidth: "600px",
          m: "auto",
          fontFamily: "cursive",
          fontSize: "23px",
        }}
      >
        Ladies, if you believe that your nails are more than just partt of your
        look, if you see them as an extension of your personality and a way to
        express your unique style, then our studio is the perfect place for you!
      </Typography>
      <Box m={5} sx={{}}>
        <Typography
          sx={{
            pb: 5,
            maxWidth: "600px",
            m: "auto",
            fontFamily: "cursive",
            fontSize: "23px",
          }}
        >
          Our talanted team of nail artists is dedicated to providing a
          professional and personalized experience every time you visit. We
          pride ourselfs on our ability to listen, understand and create
          exactrly what you envision - whenther it is a fresh bold design that
          lets you stand out or a refined, polished look that exudes
          sophistication!
        </Typography>
        <Typography
          sx={{
            pb: 5,
            maxWidth: "600px",
            m: "auto",
            fontFamily: "cursive",
            fontSize: "23px",
          }}
        >
          Meet our team
        </Typography>
        <Suspense fallback={"Loading..."}>
          <MemberCard />
        </Suspense>
        <Typography
          sx={{
            py: 5,
            maxWidth: "600px",
            m: "auto",
            fontFamily: "cursive",
            fontSize: "23px",
          }}
        >
          Come in, treat yourself, and let us help you find a nail style that
          makes you feel good, whether it is a daring new design or a chic,
          classic look. Because you deserve to feel confident and fabulous every
          day, and we are here to make that happen. That is what we can offer
          you!
        </Typography>
        <Link sx={{ mt: 5 }} onClick={() => router.push("/treatments")}>
          <Typography
            sx={{
              maxWidth: "600px",
              m: "auto",
              fontFamily: "cursive",
              fontSize: "23px",
            }}
          >
            Here you can find what we can offer you:
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
