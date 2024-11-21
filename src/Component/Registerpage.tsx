 import { useForm, SubmitHandler } from "react-hook-form";
 import { createUserWithEmailAndPassword } from "firebase/auth";
 import { auth } from "../firebaseConfig"; // Adjust the path as needed
 import { useNavigate } from "react-router-dom";
 import {
   TextInput,
   PasswordInput,
   Button,
   
   Stack,
 } from "@mantine/core"; // Import Mantine components

 interface RegisterFormValues {
   email: string;
   password: string;
 }

 const RegisterPage = () => {
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<RegisterFormValues>();
   const navigate = useNavigate();

   const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
     try {
       await createUserWithEmailAndPassword(auth, data.email, data.password);
       alert("Account created successfully!");
       navigate("/"); // Redirect to login page
     } catch (error: any) {
       alert(`Error: ${error.message}`);
     }
   };

   return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
       <form
         onSubmit={handleSubmit(onSubmit)}
         className="bg-white p-8 rounded shadow-md w-full max-w-sm"
       >
         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
         <Stack >
           {/* Email Input */}
           <div className="mb-4">
             <TextInput
               label="Email"
               placeholder="Enter your email"
               {...register("email", { required: "Email is required" })}
               error={errors.email ? errors.email.message : null}
               size="md"
             />
           </div>

           {/* Password Input */}
           <div className="mb-4">
             <PasswordInput
               label="Password"
               placeholder="Enter your password"
               {...register("password", { required: "Password is required" })}
               error={errors.password ? errors.password.message : null}
               size="md"
             />
           </div>

           {/* Register Button */}
           <Button type="submit" fullWidth color="blue" size="md" className="bg-blue-500 w-full p-2 rounded-md">
             Register
           </Button>
         </Stack>
       </form>
     </div>
   );
 };

 export default RegisterPage;
