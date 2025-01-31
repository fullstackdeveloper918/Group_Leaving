"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import Cookies from "js-cookie";
import { parseCookies } from "nookies";

const AccountEmailprefrence = ({ userInfo, data }: any) => {
  console.log(data?.data?.event_remainders, "evindata");

  

  const [cardReminders, setCardReminders] = useState<boolean>(
    data?.data?.card_remainders
  );
  // console.log("cardRem",cardReminders)
  const [eventReminders, setEventReminders] = useState<boolean>(
    data?.data?.event_remainders
  );
  const [paidCardUpdates, setPaidCardUpdates] = useState<boolean>(
    data?.data?.paid_card_updates
  );
  const [marketingEmails, setMarketingEmails] = useState<boolean>(
    data?.data?.marketing_email_and_discounts
  );
  const token = "your_token_here";
  const submit = async () => {
    try {
      const requestData = {
        user_uuid: data?.data?.uuid,
        card_remainders: cardReminders,
        event_remainders: eventReminders,
        paid_card_updates: paidCardUpdates,
        marketing_email_and_discounts: marketingEmails,
      };
      
      const cookies = parseCookies();
    console.log(cookies,"coofghjklkies");
    
    const token = cookies.auth_token;

      let res = await fetch(
        "https://magshopify.goaideme.com/user/email-preferences",
        {
          method: "POST", // Method set to POST
          headers: {
            "Content-Type": "application/json", // Indicates that you're sending JSON
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
          body: JSON.stringify(requestData), // Stringify the data you want to send in the body
        }
      );

      // Parse the response JSON
      let posts = await res.json();
      console.log(posts, "sds");
      toast.success("Preferences Updated Successfully");
    } catch (error) {}
  };
  return (
    <>
      {/* <ToastContainer/> */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Email Preferences
        </h2>
        <div className="space-y-4">
          {/* Card Reminders */}
          <div className="form-check form-switch items-center justify-between">
            <input
              type="checkbox"
              id="card-reminders"
              checked={cardReminders}
              onChange={() =>setCardReminders(!cardReminders)}
              
              className="form-check-input"
            />
            <label htmlFor="card-reminders" className="text-sm font-medium">
              Card Reminders
            </label>
            {/* <div className="form-check form-switch"> */}
            {/* <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
  <label htmlFor="card-reminders" className="text-sm font-medium">Card Reminders</label> */}
            {/* </div> */}
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Receive specific emails about the cards you’ve created, e.g., a
            reminder to finish a started card
          </p>

          {/* Event Reminders */}
          <div className="form-check form-switch items-center justify-between">
            <label htmlFor="event-reminders" className="text-sm font-medium">
              Event Reminders
            </label>
            <input
              type="checkbox"
              id="event-reminders"
              checked={eventReminders}
              onChange={() => setEventReminders(!eventReminders)}
              className="form-check-input"
            />
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Event reminder emails that you create on our reminders page
          </p>

          {/* Paid Card Updates */}
          <div className="form-check form-switch items-center justify-between">
            <label htmlFor="paid-updates" className="text-sm font-medium">
              Paid Card Updates
            </label>
            <input
              type="checkbox"
              id="paid-updates"
              checked={paidCardUpdates}
              onChange={() => setPaidCardUpdates(!paidCardUpdates)}
              className="form-check-input"
            />
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Updates about your paid cards, e.g., a warning when it is about to
            be sent
          </p>

          {/* Marketing Emails */}
          <div className="form-check form-switch items-center justify-between">
            <label htmlFor="marketing-emails" className="text-sm font-medium">
              Marketing Emails and Discounts
            </label>
            <input
              type="checkbox"
              id="marketing-emails"
              checked={marketingEmails}
              onChange={() => setMarketingEmails(!marketingEmails)}
              className="form-check-input"
            />
          </div>
          <p className="text-xs text-gray-500 pl-4">
            Occasionally receive emails about our product updates, relevant
            events, and discounts
          </p>
        </div>

        {/* Informational Section */}
        <div className="bg-blue-100 p-3 mt-4 rounded-md text-sm text-blue-700">
          <p>
            We will always send you transactional emails related to your
            purchases, e.g., a receipt, an email when your card is sent, thank
            you emails received from the recipient.
          </p>
        </div>

        {/* Update Button */}
        <button
          onClick={submit}
          className="w-full mt-6 bg-blue-600 text-black border-2 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default AccountEmailprefrence;
