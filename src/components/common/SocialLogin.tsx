"use client";
import React, { useEffect } from "react";
// import { GlobalContext } from "@/context/Provider";
// import { getFirebaseMessageToken } from "@/utils/firebase";
// import henceforthApi from "@/utils/henceforthApi";
// import { Button } from "@/lib/AntRegistry";
// import Icons from "./Icons";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import api from "@/utils/api";
// import { COOKIES_USER_ACCESS_TOKEN } from "@/context/actionTypes";

const GoogleLogin = () => {
  const divRef = React.useRef(null) as any;
  const router = useRouter();
  const loginWithGoogle = async (response: any) => {
    console.log('Google Response', response);
    // setLoading(true)
    // let fcm_token = await getFirebaseMessageToken()
    let items = {
        social_token: response?.credential,
        social_type: "GOOGLE",
        // fcm_token: fcm_token?.tokenId,
        // device_type: "WEB"
    }
    try {
        let apiRes = await api.Auth.signUp(items)
        // if (userInfo?.access_token) {
        //     henceforthApi.setToken('')
        // }
        // setUserInfo(apiRes)
       
        // setCookie(this, COOKIES_USER_ACCESS_TOKEN, apiRes?.access_token, { path: '/' })
        api.setToken(apiRes?.access_token)
        // Toast.success("Login Successfully")
    } catch (error) {
        // Toast.error(error)
    } finally {
        // setLoading(false)
    }

}
  const googleButton = () => {
    if (divRef.current) {
      const google = (window as any).google;
      google?.accounts?.id?.initialize({
        client_id:
          // "648936783615-s3ef45tdblc2kq6073e4his54doo9o4p.apps.googleusercontent.com",
          "532793655516-94neooqgg2paeula8ricuvon7pjkq07i.apps.googleusercontent.com",
        callback: loginWithGoogle,
        cancel_on_tap_outside: false,
      });
      google?.accounts?.id?.renderButton(divRef.current, {
        shape: "rectangular", // You can choose "rectangular" or "circle"
        size: "large",
        type: "standard",
        theme: "outline",
        
      });
      // console.log(divRef.current);
      // divRef.current.children[0].children[0].children[0].style.maxWidth='100%';
      // divRef.current.children[0].children[0].children[0].style.fontSize='16px';
    }
  };
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", googleButton);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const loginWithMicrosoft = (loginResponse:any) => {
    // Handle the login response here
    console.log('Microsoft login successful:', loginResponse);
  };
 
  return (
    <div>
      {/* <div className="col-md-6"> */}
      <div ref={divRef}></div>
      {/* </div> */}
      {/* <Button
        className="google-btn w-100 mb-2"
        size="large"
        ref={divRef}
        aria-placeholder=""
        // icon={<img src="/path-to-your-google-icon.png" alt="Google Icon" style={{ marginRight: 8 }} />} // Add the Google icon here
      >
        Sign up with Google
      </Button> */}
      {/* <Button size='middle'  type='default' shape='circle' htmlType='button' style={{ width: 40, height: 40 }} ref={divRef}  className='btn-blue fw-medium text-white'>Sign up with Google</Button> */}
      {/* <Button type='default' onClick={loginWithFacebook} size='large' htmlType='button' icon={<Icons.FaceBookIcon />} className='btn-blue text-white' block>Continue with Facebook</Button> */}
    </div>
  );
};

export default GoogleLogin;
