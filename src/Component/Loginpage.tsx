 import { useForm, SubmitHandler } from "react-hook-form";
 import { signInWithEmailAndPassword } from "firebase/auth";
 import { auth } from "../firebaseConfig"; // Adjust the path as needed
 import { useNavigate } from "react-router-dom";
 import {
   TextInput,
   PasswordInput,
   Button,
   Box,
   Text,
   Stack,
 } from "@mantine/core"; // Import Mantine components

 interface LoginFormValues {
   email: string;
   password: string;
 }

 const LoginPage = () => {
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<LoginFormValues>();
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
     try {
       await signInWithEmailAndPassword(auth, data.email, data.password);
       alert("Login successful!");
       navigate("/notes"); // Redirect to a protected route
     } catch (error: any) {
       alert(`Error: ${error.message}`);
     }
   };

   return (
     <Box
       className=""
       style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         minHeight: "100vh",
         backgroundColor: "#f9fafb",
       }}
     >
       <form
         onSubmit={handleSubmit(onSubmit)}
         className="bg-white p-8 rounded shadow-md w-full max-w-sm"
       >
         <Text className="font-bold text-center text-xl">Login</Text>

         <Stack>
           {/* Email Input */}
           <label className=""> Email</label>
           <TextInput
             {...register("email", { required: "Email is required" })}
             type="email"
             className="w-full px-4 py-2 border rounded"
             error={errors.email ? errors.email.message : null}
           />

           <label>Password</label>
           <PasswordInput
             className="w-full px-4 py-2 border rounded"
             {...register("password", { required: "Password is required" })}
             error={errors.password ? errors.password.message : null}
             withAsterisk
           />

           {/* Login Button */}
           <Button
             type="submit"
             fullWidth
             color="blue"
             size="md"
             className="bg-blue-500 p-2 rounded-sm w-full"
           >
             Login
           </Button>
         </Stack>

         {/* Register Link */}
         <Text mt="md" size="sm" className="mt-3">
           Don't have an account?{" "}
           <Text
             component="a"
             href="/register"
             className="text-blue-700 underline "
           >
             Register here
           </Text>
         </Text>
       </form>
     </Box>
   );
 };

 export default LoginPage;
