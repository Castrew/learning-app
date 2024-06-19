// "use client";

// import React from "react";
// import { Box, Button } from "@mui/material";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useSignUpUser } from "../core/react-query/users/hooks/useSignUpUser";
// import { useRouter } from "next/navigation";

// interface SignUpFormProps {
//   id: number;
//   name: string;
//   email: string;
// }

// const TestComponent = () => {
//   const router = useRouter();
//   const createUser = useSignUpUser();
//   const { register, handleSubmit } = useForm<SignUpFormProps>();
//   const onSubmit: SubmitHandler<SignUpFormProps> = (data) => {
//     createUser.mutate(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Box display="flex" flexDirection="column">
//         <Box>
//           Name: <input {...register("name")} />
//         </Box>
//         <Box>
//           Email: <input {...register("email")} />
//         </Box>
//       </Box>
//       <Button type="submit" onClick={() => router.push("/")}>
//         Create
//       </Button>
//     </form>
//   );
// };

// export default TestComponent;
