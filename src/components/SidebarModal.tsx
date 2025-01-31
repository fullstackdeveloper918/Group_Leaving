"use client"
import React, { useEffect, useState } from "react";
import nookies from 'nookies';
interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  data:any,
  
}

const SidebarModal: React.FC<SidebarModalProps> = ({ isOpen, onClose,data }) => {
  const [deliveryOption, setDeliveryOption] = useState("later");
  const [collectionTitle, setCollectionTitle] = useState(data?.collection_title);
  const [senderName, setSenderName] = useState(data?.sender_name);
  const [recipientEmail, setRecipientEmail] = useState(data?.recipient_email);
  const [deliveryDate, setDeliveryDate] = useState(data?.start_date);
  const [deliveryTime, setDeliveryTime] = useState(data?.end_date);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
console.log(cookieValue,"cookieValue");

  useEffect(() => {
    // Get cookies on the client side
    const cookies = nookies.get(); // retrieves cookies from document.cookie
    const userData = cookies.userInfo ? JSON.parse(cookies.userInfo) : null;
    setCookieValue(userData?.uuid  || null);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      edit_by:cookieValue,
      brandKey:data?.brandKey,
      linkUuid:data?.uuid,
      collection_title: collectionTitle,
      sender_name:senderName,
      recipient_email:recipientEmail,
      delivery_option:deliveryOption,
      start_date:deliveryDate,
      end_date: deliveryTime,
    };

    try {
      // Send form data to the API (replace with your API endpoint)
      const response = await fetch("https://magshopify.goaideme.com/razorpay/update-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // if (response.ok) {
      //   alert("Data saved successfully");
      //   onClose(); // Close the modal after successful submission
      // } else {
      //   alert("Failed to save data");
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the data.");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <label className="block">
              <span className="text-gray-700">What is the title of your collection?</span>
              <input
                type="text"
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
                placeholder="Collection Title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Who is the collection from? (optional)</span>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Sender Name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Recipient Email</span>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="Recipient Email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <div>
              <span className="text-gray-700">When should we email the gift to the recipient?</span>
              <div className="mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="delivery"
                    className="form-radio"
                    value="set-date"
                    checked={deliveryOption === "set-date"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                  />
                  <span>Set delivery date</span>
                </label>
                <label className="flex items-center space-x-2 mt-1">
                  <input
                    type="radio"
                    name="delivery"
                    className="form-radio"
                    value="later"
                    checked={deliveryOption === "later"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                  />
                  <span>Do this later</span>
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  This is based on the timezone your computer is set to.
                </p>
                {deliveryOption === "set-date" && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="sr-only">Date</span>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">Time</span>
                      <input
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-black border-2 py-2 px-4 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SidebarModal;
