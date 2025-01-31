// "use client"
import GroupCollection from "@/components/GroupCollection";
import React from "react";

const page = async({params, searchParams}:any) => {
console.log(params.id,"khskhk");

let data = await fetch(`https://magshopify.goaideme.com/razorpay/single-link-listing/${params.id}`, {
  method: 'GET', // Method set to GET
  headers: {
    'Cache-Control': 'no-cache',
     cache: 'reload'
  }
});
// console.log(gettoken,"ggg");
// Parse the response JSON
let response = await data.json();
console.log(response,"response");

  return (
   <GroupCollection params={params} searchParams={searchParams} data={response}/>
  );
};

export default page;
