"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import { signIn } from "next-auth/client";

const schema = yup.object({
  email: yup.string("Input valid email").required("Email is required"),
  password: yup.string().required("input the password"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
    });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    }

    // console.log("Hasil Login : ", response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8">
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
          Login
        </button>
      </div>
    </form>
  );
}
