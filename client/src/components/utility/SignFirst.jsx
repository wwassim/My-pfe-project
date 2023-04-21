import React from "react";
import { useNavigate } from "react-router-dom";

const SignFirst = () => {
    const navigate = useNavigate();
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-bold mb-2 text-center">
         Sign in first
        </div>
        <img
          src="/assets/signin.png"
          alt="no account"
          className="h-100 "
        />
        <button  onClick={()=>navigate("/auth")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            sign in
        </button>
      </div>
    );
}

export default SignFirst

