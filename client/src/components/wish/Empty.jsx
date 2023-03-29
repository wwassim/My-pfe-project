import React from "react";
import { useNavigate } from "react-router-dom";
function Empty() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold mb-8 text-center">
        Your Wishlist is Empty
      </div>
      <img
        src="https://elegantjewelersli.com/assets/images/empty-wishlist.png"
        alt="Empty Wishlist"
        className="h-64 mb-8"
      />
      <button  onClick={()=>navigate("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue Shopping
      </button>
    </div>
  );
}

export default Empty;
