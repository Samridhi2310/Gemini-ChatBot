"use client";
import React from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Regex } from "lucide-react";
// const schema=yup.object({
//   name:yup.string().required("Name is required").min(4,"NAME MUST BE OF ATLEAST 4 WORDS"),
//   email:yup.string().required("email is required").email(),
//   password:yup.string().required("password is required").min(8, "Password must be at least 8 characters").
//                         matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//                         .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//                         .matches(/[0-9]/, "Password must contain at least one number")
//                         .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")

// }).required()
const schema = z.object({
  name: z
    .string()
    .nonempty("name is required")
    .min(4, "name must be of atleast 4 words"),
  email: z.string().nonempty("email is required").email(),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
    confirmpassword:z.string()
}).refine((data)=>data.password===data.confirmpassword ,{
  message: "password does not match",
path:["confirmpassword"],});

function SchemaValidation() {
  let render=0;
  render++
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Data submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
  };
  // const watchPassword=watch("password","confirmpassword")
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>{render}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-cyan-600 text-xl font-bold">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            className="text-lg p-2 border rounded-md"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-cyan-600 text-xl font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            className="text-lg p-2 border rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-cyan-600 text-xl font-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="text-lg p-2 border rounded-md"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="confirmpassword" className="text-cyan-600 text-xl font-bold">
            Confirm Password
          </label>
          <input
            id="confirmpassword"
            type="password"
            placeholder="Retype password"
            className="text-lg p-2 border rounded-md"
            {...register("confirmpassword",)}
          />
            {/* {watchPassword[0]===watchPassword[1] || "password donot match"} */}
          {errors.confirmpassword && (
            <p className="text-red-500 text-sm">{errors.confirmpassword?.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-2 bg-blue-500 text-white text-lg rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default SchemaValidation;
// "use client";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const schema = z.object({
//   name: z.string().min(4, "Name must be at least 4 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[0-9]/, "Password must contain at least one number")
//     .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
// });

// function SchemaValidation() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({ mode: "all", resolver: zodResolver(schema) });

//   const onSubmit = async (data) => {
//     console.log("Data submitted:", data);
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex flex-col gap-4">
//           <label htmlFor="name" className="text-cyan-600 text-xl font-bold">
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Enter name"
//             className="text-lg p-2 border rounded-md"
//             {...register("name")}
//           />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//         </div>

//         <div className="flex flex-col gap-4">
//           <label htmlFor="email" className="text-cyan-600 text-xl font-bold">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter email"
//             className="text-lg p-2 border rounded-md"
//             {...register("email")}
//           />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//         </div>

//         <div className="flex flex-col gap-4">
//           <label htmlFor="password" className="text-cyan-600 text-xl font-bold">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter password"
//             className="text-lg p-2 border rounded-md"
//             {...register("password")}
//           />
//           {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white text-lg rounded-md"
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SchemaValidation;
