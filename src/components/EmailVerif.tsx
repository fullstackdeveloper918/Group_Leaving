"use client";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React from "react";

const EmailVerif = ({ searchParam }: any) => {
  const router = useRouter();
  const token = searchParam; 
  const query = token ? `token=${encodeURIComponent(token)}` : "";
  const EmailVerify = async () => {
    let data = {
      token: searchParam,
    } as any;
    const res = await api.Auth.verify(query);
    router.replace("/login");
    console.log(res, "tresss");
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-500 p-6 text-center">
          <div className="flex justify-center items-center mb-3">
            {" "}
            {/* Added mb-3 */}
            {/* Logo Placeholder */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="font-bold">Logo</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
            {" "}
            {/* Added mb-3 */}
            {/* Email Icon Placeholder */}
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12l4-4m0 0l-4-4m4 4H4m16 0l-4 4m-6 4V6m6 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
            {" "}
            Email verification
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Hi <span className="font-semibold">John Doe</span>,<br />
            You are almost set to start enjoying{" "}
            <span className="font-semibold">Company Name</span>. Simply click
            the link below to verify your email address and get started. The
            link expires in 48 hours.
          </p>
          <div className="text-center mt-3">
            {" "}
            <button
              onClick={EmailVerify}
              className="bg-red-500 text-black  border-2 border-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-red-600 mt-3 mb-3"
            >
              {" "}
              Verify your email address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerif;
