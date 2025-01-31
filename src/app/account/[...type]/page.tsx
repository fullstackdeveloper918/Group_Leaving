
// import { fetchFromServer } from "@/app/actions/fetchFromServer";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
// import { useAccessToken } from "@/app/context/AccessTokenContext";
import AccountBunddles from "@/components/AccountBunddles";
import AccountCards from "@/components/AccountCards";
import AccountContribution from "@/components/AccountContribution";
import AccountEmailprefrence from "@/components/AccountEmailprefrence";
import AccountProfile from "@/components/AccountProfile";
import AccountSlider from "@/components/common/AccountSlider";
import Cart from "@/components/common/Cart";
import Table from "@/components/common/Table";
import api from "@/utils/api";
import { cookies } from 'next/headers';
import nookies from 'nookies';
// import { user } from "@/utils/cybersifyApi";
import { useEffect } from "react";

const page = async({ params }: any) => {
    // const accessToken3 = useAccessToken();
    // console.log(accessToken3, "accessToken3");
  const type = params.type[0];
  console.log(type, "uuusufusd");
    const cookiesList = cookies();
  const userInfoCookie = cookiesList.get('userInfo'); 
  const gettoken:any = cookiesList.get('auth_token'); 
  console.log(gettoken.value,"gettoken");
  let userInfo = null;
  if (userInfoCookie) {
    try {
      userInfo = JSON.parse(userInfoCookie.value);
    } catch (error) {
      console.error("Error parsing userInfo cookie", error);
    }
  }
  const api1: any = {
    url: `https://magshopify.goaideme.com/cart/cart-listing`,
    method: "GET",
    // headers: {
    //   'authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
    // }
  };

  const api2: any = {
    url: `https://magshopify.goaideme.com/card/card-listing`,
    method: "GET",
    // headers: {
    //   'authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
    // }
  };

  // const data2 = await fetchFromServer(api2);
  // const api: any = {
  //   url: `https://magshopify.goaideme.com/user/profile`,
  //   method: "GET",
  //   // body: { key: 'value' }
  // };

  // const data = await fetchFromServer(api);
  // console.log(data,"werwerrrrrrr");

  // const token = userInfo.token;
  // console.log(token,"tokfdfdfdfen");
  
  let data = await fetch('https://magshopify.goaideme.com/user/profile', {
    method: 'GET', // Method set to GET
    headers: {
      'Authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
    }
  });
  let data1 = await fetch('https://magshopify.goaideme.com/cart/cart-listing', {
    method: 'GET', // Method set to GET
    headers: {
      'Authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
    }
  });
  let data2 = await fetch('https://magshopify.goaideme.com/card/card-listing', {
    method: 'GET', // Method set to GET
    headers: {
      'Authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
    }
  });
  console.log(gettoken,"ggg");
  
  // Parse the response JSON
  let posts = await data.json();
  let posts1 = await data1.json();
  let posts2 = await data2.json();
  console.log(posts,"posts");
  
 console.log(userInfo,"sdfsdfsd");
//  https://magshopify.goaideme.com/user/update-profile
// https://magshopify.goaideme.com/card/user-paid-bundle-list
  return (
    <div className=" bg-lightbg flex justify-center items-center">
      <div className="w-full max-w-[70%] bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Account</h1>
        <AccountSlider type={type}/>
        {type==="profile" && <AccountProfile data={userInfo} userInfo={gettoken.value}/>}
        {type==="cart" && <Cart />}
        {type==="cards" && <AccountCards data={posts2}/>}
        {type==="bundles" && <AccountBunddles data={posts} userInfo={gettoken.value}/>}
        {type==="email-preferences" && <AccountEmailprefrence data={posts} userInfo={gettoken.value}/>}
        {/* {type==="contributions" && <AccountContribution />} */}
        {type==="batches" && <Table />}
      </div>
    </div>
  );
};

export default page;
