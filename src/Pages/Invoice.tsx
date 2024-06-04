import React, { useEffect } from "react";
import logo from "../Assets/levi.png";
import { useUser } from "../UserContext";

const Invoice = ({ cart, setCart }) => {
  const { userData } = useUser();

  const calculateTotal = (quantity, price) => quantity * price;

  const totalAmount = cart.reduce(
    (acc, item) => acc + calculateTotal(item.quantity, item.price),
    0
  );

  const gst = totalAmount * 0.18;
  const grandTotal = totalAmount + gst;
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // Adding 15 days in milliseconds

  const handleDownload = async () => {
    const response = await fetch("http://localhost:3000/generate-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, userData }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("Failed to download the PDF.");
    }
  };

  const searchParams = new URLSearchParams(window.location.search);
  const isPdf = searchParams.get("pdf") === "true";

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/${userData.email}`
      ); // Fetch cart data specific to the user
      const data = await response.json();
      if (response.ok) {
        setCart(data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (userData.email) {
      fetchCart();
    }
  }, [userData]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-xl font-bold">INVOICE</h1>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="flex">
              <img src={logo} className="h-10 w-10" alt="logo" />
              <h2 className="text-2xl font-bold">levitation</h2>
            </div>
            <p className="text-gray-500 text-right">infotech</p>
          </div>
        </div>
      </div>
      <table className="min-w-full bg-white mt-8">
        <thead>
          <tr>
            <th className="py-2 text-left">Product</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Rate</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">{item.price}</td>
              <td className="py-2 text-right">
                INR {calculateTotal(item.quantity, item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">Total</p>
            <p className="font-bold">GST</p>
            <p className="text-blue-600 font-bold text-xl">Grand Total</p>
          </div>
          <div className="text-right">
            <p>INR {totalAmount.toFixed(2)}</p>
            <p>{gst.toFixed(2)}</p>
            <p className="text-blue-600 font-bold text-xl">
              ₹ {grandTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="mt-8 text-gray-500">
          Valid until:
          <span className="font-bold"> {futureDate.toLocaleDateString()}</span>
        </p>
      </div>
      <div className="mt-8 bg-gray-800 text-white p-4 rounded-md">
        <p className="font-bold">Terms and Conditions</p>
        <p className="text-gray-300">
          We are happy to supply any further information you may need and trust
          that you call on us to fill your order, which will receive our prompt
          and careful attention.
        </p>
      </div>
      {!isPdf && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default Invoice;
