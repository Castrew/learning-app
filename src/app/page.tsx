import { HomePage } from "@/modules/HomePage";
import { validateRequest } from "../../lib/auth";
import { redirect } from "next/navigation";
// import withAuth from "./withAuth";

const Home: React.FC = () => {
  // const { user } = await validateRequest();
  // console.log(user, "Home");

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
