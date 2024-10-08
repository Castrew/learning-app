import { SignUpForm } from "@/components/SignUpForm";
import { Box } from "@mui/material";
import { validateRequest } from "../../../lib/auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  return (
    <Box>
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
