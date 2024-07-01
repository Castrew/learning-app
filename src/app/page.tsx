import { HomePage } from "@/modules/HomePage";
<<<<<<< Updated upstream
import { validateRequest } from "../../lib/auth";
import { redirect } from "next/navigation";
// import withAuth from "./withAuth";

const Home: React.FC = () => {
  // const { user } = await validateRequest();
  // console.log(user, "Home");

  // if (!user) {
  //   return redirect("/sign-in");
  // }

=======

const Home: React.FC = () => {
>>>>>>> Stashed changes
  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
