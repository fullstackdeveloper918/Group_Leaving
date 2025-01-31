"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "./common/Table";

const AccountBunddles = ({ userInfo, data }: any) => {
  const router = useRouter();
  // let posts=null
  const [state, setState] = useState<any>("");
  const submit = async () => {
    try {
      const requestData = {
        user_uuid: data?.data?.uuid,
      };

      let res = await fetch(
        "https://magshopify.goaideme.com/card/user-paid-bundle-list",
        {
          method: "POST", // Method set to POST
          headers: {
            "Content-Type": "application/json", // Indicates that you're sending JSON
            Authorization: `Bearer ${userInfo}`, // Send the token in the Authorization header
          },
          body: JSON.stringify(requestData), // Stringify the data you want to send in the body
        }
      );

      // Parse the response JSON
      let posts = await res.json();
      setState(posts);
      console.log(posts, "sds");
      toast.success("Preferences Updated Successfully");
    } catch (error) {}
  };
  useEffect(() => {
    submit();
  }, []);
  console.log(state, "jkshjsd");
  const filteredData = state?.message?.filter(
    (item: any) => item.razorInfo.length > 0
  );
  const handlePickBundle = () => {
    // Route to the bundle selection page
    router.push("/pricing");
  };
  return (
    <div className=" flex flex-col justify-center items-center bg-gray-100">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-4">My Bundles</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* <h2 className="text-xl font-semibold mb-4">Signed Cards</h2> */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {/* <th className="py-2 px-4 text-left font-medium text-gray-600">
                 Sr. No.
                </th> */}
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Number of cards
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Sale Price
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                Discount (%)
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                Currency type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border px-3 mt-2">
                {/* <td className="py-3 px-4">
                  <img
                    src="https://groupleavingcards.com/images/gift/collection_pot.png"
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                </td> */}
                {/* <td className="py-3 px-4">{filteredData[0]?.number_of_cards||"N/A"}</td>
                <td className="py-3 px-4">{filteredData[0]?.sale_price||"N/A"}</td>
                <td className="py-3 px-4">{filteredData[0]?.discount||"N/A"}</td>
                <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">
                {filteredData[0]?.currency_type}
                </td> */}
                Data Not Found
              </tr>
              {/* Additional rows can be added here */}
            </tbody>
          </table>
        </div>
      </div>
      {/* Message */}
      <p className="text-gray-500 text-center mb-6">
        Looks like you haven’t got any card bundles yet. Get started by
        selecting a bundle that works for you.
      </p>

      {/* Action Button */}
      <button
        onClick={handlePickBundle}
        className="bg-blue-600 text-black border-2 py-2 px-6 rounded-full hover:bg-blue-700"
      >
        Pick a Bundle
      </button>
    </div>
  );
};

export default AccountBunddles;
