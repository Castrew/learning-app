// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { validateRequest } from "../../lib/auth";

// const withAuth = (WrappedComponent) => {
//   const WithAuthComponent = (props) => {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(true);
//     console.log(WrappedComponent);

//     useEffect(() => {
//       const checkAuth = async () => {
//         const { user } = await validateRequest();

//         if (!user) {
//           router.push("/sign-in");
//           return;
//         }

//         const isAdmin = user?.id === "16aafx78kvkvgt2";
//         if (!isAdmin) {
//           router.push("/not-authorized"); // Redirect to a not authorized page or handle it accordingly
//           return;
//         }

//         setIsLoading(false);
//       };

//       checkAuth();
//     }, [router]);

//     // if (isLoading) {
//     //   return <div>Loading...</div>; // Render a loading state or spinner
//     // }

//     // Render the WrappedComponent with its props
//     // return <WrappedComponent {...(props as P)} />;
//   };

//   return WithAuthComponent;
// };

// export default withAuth;
