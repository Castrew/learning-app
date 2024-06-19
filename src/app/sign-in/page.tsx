import { SignInForm } from "@/components/SignInForm";
import { Box } from "@mui/material";
import { validateRequest } from "../../../lib/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const { user } = await validateRequest();

  if (user) {
    return redirect("/");
  }

  return (
    <Box>
      <SignInForm />
    </Box>
  );
};

export default SignInPage;
