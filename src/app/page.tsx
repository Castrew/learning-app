import { HomePage } from "@/modules/HomePage";
import { validateRequest } from "../../lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const { user } = await validateRequest();
  console.log(user, "Home");

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
