import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";

const FailPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-3xl font-bold mb-8 text-center">
     Your order is failed.
    </div>
    <img
      src="assets/trasactionFailed.jpg"
      alt="Empty Wishlist"
      className="h-64 mb-8"
    />
    <button  onClick={()=>navigate("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      back to home page
    </button>
  </div>
  )
}

export default FailPayment
