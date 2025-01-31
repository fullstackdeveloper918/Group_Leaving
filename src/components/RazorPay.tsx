"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
// import { cookies } from "next/dist/client/components/headers";
// import { cookies } from "next/headers";
import nookies from "nookies";
import { useParams, useRouter, useSearchParams } from "next/navigation";
declare global {
  interface Window {
    Razorpay: any;
  }
}
interface UserInfo {
  name: string;
  email: string;
}
const RazorPay = ({ amount, type,cart_id }: any) => {
  console.log(amount, "amount");
  console.log(type, "type");
  console.log(cart_id,"cart_id");
  
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [payId, setPayId] = useState<any>(null);

  const param = useParams();
  const cartId:any = useSearchParams();
  console.log(cartId,"cartId");
  
  console.log(param.id, "param");
  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
  console.log(userInfo, "userInfouserInfo");

  const AMOUNT = amount;
  const [isProcessing, setIsProcessing] = useState(false);
  const product_id = "sadasd_e21ZXC31332212_fdgh";
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api1/create", { method: "POST" });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Wedding",
        description: "Test Transaction",
        // card_id:"2131332212",
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("Payment successful", response);

          // Here you get the payment ID after successful payment
          const paymentId = response.razorpay_payment_id;
          setPayId(paymentId);
          // console.log("Payment ID:", paymentId);
          // console.log("Payment ID0:", paymentId?.razorpay_payment_id);
          // console.log("Payment ID1:",JSON.stringify({ paymentId }));
          const product_id = param.id;
          const cart_id=cartId.cart_uuid
          console.log(cart_id,"cartaaaa_id");
          
          // For example:
          fetch("https://magshopify.goaideme.com/razorpay/save-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart_uuid:cart_id,
              product_id: product_id,
              user_uuid: userInfo?.uuid,
              paymentId: paymentId,
              payment_for: type,
              // cart_uuid:"e941026e-756e-4c1f-88f2-d4b7f062bb40"
            }),
          });
          // Handle success as per your application's need (e.g., updating UI, sending confirmation)
        },
        prefill: {
          namne: "Abhay Singh",
          email: "testing@gmail.com",
          contact: "9999999999",
        },
        notes: {
          product_id: product_id,
          user_uuid: userInfo?.uuid,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      console.log(rzp1.open(), "xcxc");
      console.log(rzp1, "rzp1");
      // router.back()
      if (type === "bundle" || payId) {
        router.push(`/account/bundles`);
      } else {
        // router.push(`/card /farewell`);
      }
    } catch (error) {
      console.log(error, "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="mt-6 bg-blue-600 text-blueText w-full py-2 rounded-xl border-2 border-[blueText] hover:bg-blue-700"
      >
        {isProcessing ? "Processign..." : `Pay Now :${amount} INR`}
      </button>
    </>
  );
};

export default RazorPay;
