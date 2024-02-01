"use client";
import { signOut } from "next-auth/react";
import type { FC } from "react";

interface pageProps {}

const Logout: FC<pageProps> = () => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <button
      onClick={() => {
        handleLogout();
      }}
      className="border border-r-emerald-800 bg-blue-500 text-white"
    >
      LOGOUT
    </button>
  );
};
export default Logout;
