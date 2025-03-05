"use client";
import React, { useState,useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";


function FormData() {
 
  const render = useRef(0);
  render.current += 1; 
  const form = useForm({
    mode: "all",
    defaultValues: {
      user: [{ username: "", password: "" }],
      skills: [{ skill: "" }],
    },
  });
  const { register, control, handleSubmit, formState, watch,getValues,setValue,reset,trigger,getFieldState} = form;
  const { errors,touchedFields,dirtyFields,isDirty,isValid,isSubmitted,isSubmitSuccessful,isSubmitting,submitCount } = formState;
  const watchForm = watch();
   const [getData,setgetData]=useState([])
  const { fields, append, remove } = useFieldArray({ name: "skills", control });
  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };
  function handleClick(){
    const values = getValues();
    setgetData(values)
    console.log("Data Retrived Using getVAlues()",getData);
  }
  console.log({touchedFields,dirtyFields,isDirty})
  function handleSetClick(){
    setValue("age",20)
  }
  const onError=(errors,e)=>{
    console.log("error",errors,e)

  }
 console.log({isSubmitSuccessful,isSubmitted,isSubmitting,submitCount})
 function handleReSetClick(){
  reset();
 }
 console.log(getFieldState())
  return (
    <div className="">
      <p>{render.current/2}</p>
        <h1 className="text-3xl text-black">
          User: {watchForm?.user?.[0]?.username}<br/> Password:{" "}
          {watchForm?.user?.[0]?.password}<br/> Age: {watchForm?.age}<br/> Skills:{" "}<br/>
          {watchForm?.skills?.map((s) => s.skill).join(", ")}<br/>
          
        </h1>
        <p className="text-3xl text-black">  User: {getData?.user?.[0]?.username}<br/> Password:{" "}
          {getData?.user?.[0]?.password}<br/> Age: {getData?.age}<br/> Skills:{" "}<br/>
          {getData?.skills?.map((s) => s.skill).join(", ")}<br/></p>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
    
        {/* User Name Field */}
        <div className="flex flex-col gap-3 m-4">
          <label htmlFor="username" className="text-cyan-300 text-3xl">
            User Name
          </label>
          <input
            type="text"
            // disabled
            {...register("user.0.username", {
              // disabled:true,
              required: { value: true, message: "Enter the user name" },
              validate: (fieldValue) =>
                fieldValue !== "Samridhi" || "Enter another user name",
            })}
            placeholder="Enter the username"
            className="text-3xl bg-white"
          />
          <p className="text-red-500">{errors?.user?.[0]?.username?.message}</p>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-3 m-4">
          <label htmlFor="password" className="text-cyan-300 text-3xl">
            Password
          </label>
          <input
            type="password"
            {...register("user.0.password", {
              required: { value: true, message: "Enter the password" },
              validate: {
                matchPassword: (fieldValue) =>
                  fieldValue !== "krishna" || "Enter a different password",
                diffPassword: (fieldValue) =>
                  fieldValue !== "sam" || "Enter a new password",
              },
            })}
            placeholder="Enter the password"
            className="text-3xl bg-white"
          />
          <p className="text-red-500">{errors?.user?.[0]?.password?.message}</p>
        </div>

        {/* Dynamic Skill Input Fields */}
        <div className="flex flex-col gap-3 m-4">
          <label htmlFor="skill" className="text-cyan-300 text-3xl">
            List of Skills
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Enter skill"
                {...register(`skills.${index}.skill`, {
                  required: "Skill is required",
                })}
                className="text-3xl bg-white"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-green-400 text-3xl"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ skill: "" })}
            className="text-green-300 text-3xl"
          >
            Add Skill
          </button>
        </div>
        <div className="flex flex-col gap-3 m-4">
          <label htmlFor="age" className="text-cyan-300 text-3xl">
            Age
          </label>
          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Enter the age" },
              validate: (fieldValue) =>
                fieldValue >= 18 || "Enter valid age between 18 and more",
            })}
            placeholder="Enter the age"
            className="text-3xl bg-white"
          />
          <p className="text-red-500">{errors.age?.message}</p>
        </div>
        <button type="button" className="text-3xl bg-white m-4" onClick={handleClick}>GET VALUES</button>
        <button type="button" className="text-3xl bg-white m-4" onClick={handleSetClick}>SET VALUES</button>
        <button type="button" className="text-3xl bg-white m-4" onClick={handleReSetClick}>RESET</button>
        <button type="button" className="text-3xl bg-white m-4" onClick={()=>trigger()}>Trigger</button>
        {/* Submit Button */}
        <button disabled={!isDirty || !isValid} type="submit" className="text-3xl bg-white m-4">
          Submit
        </button>

      </form>
      <DevTool control={control} />
    </div>
  );
}

export default FormData;
