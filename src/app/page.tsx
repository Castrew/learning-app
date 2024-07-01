import { HomePage } from "@/modules/HomePage";
<<<<<<< Updated upstream
import { validateRequest } from "../../lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const { user } = await validateRequest();
  console.log(user, "Home");

  if (!user) {
    return redirect("/sign-in");
  }

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
