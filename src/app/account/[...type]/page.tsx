
// import { fetchFromServer } from "@/app/actions/fetchFromServer";
import AccountBunddles from "@/components/AccountBunddles";
import AccountCards from "@/components/AccountCards";
import AccountContribution from "@/components/AccountContribution";
import AccountEmailprefrence from "@/components/AccountEmailprefrence";
import AccountProfile from "@/components/AccountProfile";
import AccountSlider from "@/components/common/AccountSlider";
import Table from "@/components/common/Table";
import api from "@/utils/api";
import { cookies } from 'next/headers';
import nookies from 'nookies';
// import { user } from "@/utils/cybersifyApi";
import { useEffect } from "react";

const page = async({ params }: any) => {
  const type = params.type[0];
  console.log(type, "uuusufusd");
    const cookiesList = cookies();
  const userInfoCookie = cookiesList.get('userInfo'); 
  console.log(userInfoCookie,"ppppp");
  let userInfo = null;
  if (userInfoCookie) {
    try {
      userInfo = JSON.parse(userInfoCookie.value);
    } catch (error) {
      console.error("Error parsing userInfo cookie", error);
    }
  }
  // const api1: any = {
  //   url: user?.listing,
  //   method: "GET",
  //   // body: { key: 'value' }
  // };

  // const data1 = await fetchFromServer(api1);
  // console.log(data1,"werwerrrrrrr");
  
 
  return (
    <div className=" bg-lightbg flex justify-center items-center">
      <div className="w-full max-w-[70%] bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Account</h1>
        <AccountSlider type={type}/>
        {type==="profile" && <AccountProfile userInfoCookie={userInfo}/>}
        {type==="cards" && <AccountCards />}
        {type==="bundles" && <AccountBunddles />}
        {type==="email-preferences" && <AccountEmailprefrence />}
        {type==="contributions" && <AccountContribution />}
        {type==="batches" && <Table />}
      </div>
    </div>
  );
};

export default page;
