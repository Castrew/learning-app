// "use client";

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { signIn } from "../../actions/auth.actions";

// interface SignInFormProps {
//   username: string;
//   password: string;
// }

// export const SignInForm = () => {
//   const router = useRouter();
//   const defaultValues = { username: "", password: "" };
//   const [error, setError] = useState("");
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<SignInFormProps>({ defaultValues });

//   const onSubmit: SubmitHandler<SignInFormProps> = async (data) => {
//     const res = await signIn(data);
//     if (res.status === 404) {
//       setError(String(res.status));
//       return;
//     }
//     setError("");
//     router.push("/");
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh", // Ensures the container takes the full viewport height
//         overflow: "hidden", // Prevents scrolling
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Sign In
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box display="flex" flexDirection="column">
//             <TextField
//               id="sign-in-username-input"
//               sx={{ mb: 2 }}
//               label="Username"
//               fullWidth
//               variant="outlined"
//               {...register("username", {
//                 required: "Enter your username",
//                 minLength: {
//                   value: 5,
//                   message: "Username must be at least 5 characters long",
//                 },
//               })}
//               error={!!errors.username}
//               helperText={errors.username?.message}
//             />
//             <Controller
//               name="password"
//               control={control}
//               rules={{
//                 required: "Password is required",
//                 minLength: {
//                   value: 8,
//                   message: "Password must be at least 8 characters long",
//                 },
//               }}
//               render={({ field, fieldState: { error } }) => (
//                 <TextField
//                   id="sign-in-password-input"
//                   {...field}
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   variant="outlined"
//                   error={!!error}
//                   helperText={error ? error.message : ""}
//                 />
//               )}
//             />
//             <Typography color="error">{error}</Typography>
//             <Box display="flex" justifyContent="space-between" mt={2}>
//               <Button
//                 id="sign-up-page-button"
//                 variant="outlined"
//                 color="primary"
//                 size="large"
//                 onClick={() => router.push("/sign-up")}
//               >
//                 Register
//               </Button>
//               <Button
//                 id="submit-sign-in-button"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 type="submit"
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };
