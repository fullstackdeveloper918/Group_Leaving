"use client"
import React, { useState } from 'react'
import RazorPay from './RazorPay';

const PlanBunddlePage = ({data2}:any) => {
    const [voucher, setVaoucher] = useState<any>("");
    const [voucher1, setVaoucher1] = useState<any>("");
    const onChange = (e: any) => {
        setVaoucher(e);
      };
      const onSubmit = () => {
        setVaoucher1(voucher);
      };
      
      const TotalAmount = data2.data[0].sale_price-voucher1;
      console.log(TotalAmount,"TotalAmount");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center bg-lightBg">
    <div className="bg-white p-6 rounded-[20px] hover:shadow-lg transition-all  border border-[#e5e7eb] flex flex-col justify-between h-full">
      <h1 className="text-center text-2xl font-bold mb-4">{data2.data[0].number_of_cards} Cards Bundle</h1>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Your Bundle</h2>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-pink-200 flex items-center justify-center rounded-full">
            {/* Use an image or icon here */}
            <img
              className="w-20 h-10"
            //   style={{objectFit:"cover"}}
              src="https://groupleavingcards.com/images/team.png"
              alt="Icon"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-base font-semibold">{data2.data[0].number_of_cards} Cards Bundle</h3>
            <p className="text-sm text-gray-500">{data2.data[0].number_of_cards} cards</p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Voucher Code"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            onChange={(e: any) => onChange(e.target.value)}
            value={voucher}
          />
          <button  onClick={onSubmit} className="ml-2 text-blue-600 font-semibold">Apply</button>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Bundle Price</span>
            <span>{data2.data[0].sale_price} INR</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Tax</span>
            <span>0.00 INR</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{data2.data[0].sale_price} INR</span>
          </div>
        </div>
      </div>
      <div className="p-2">
        <RazorPay amount={TotalAmount} type={"bundle"}/>
      </div>
    </div>
  </div>
  )
}

export default PlanBunddlePage