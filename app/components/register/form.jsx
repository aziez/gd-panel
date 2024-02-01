"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("username is required"),
  email: yup.string("Input valid email").required("Email is required"),
  password: yup.string().required("input the password"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(data);

    try {
      await axios
        .post("/api/auth/register", data)
        // .then(() => setData({ username: "", email: "", password: "" }))
        .then(() => console.log("Berhasil registrasi User"));
    } catch (error) {
      console.log(error, "ERROR CREATE USER");
    }

    // try {
    //   const response = await fetch(`/api/v1/auth/register`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   console.log({ response });
    // } catch (error) {
    //   console.log("ERROR", error);
    // }

    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          {...register("username", { required: true })}
          className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <p className="text-red-500 text-xs italic">
          {errors?.username?.message}
        </p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
          className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <p className="text-red-500 text-xs italic">{errors?.email?.message}</p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true, min: 6 })}
          className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <p className="text-red-500 text-xs italic">
          {errors?.password?.message}
        </p>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
