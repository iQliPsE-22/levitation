import React, { useEffect } from "react";
import logo from "../Assets/levi.png";
import { useUser } from "../UserContext";

// Define the Product interface with appropriate types
interface Product {
  email: string;
  name: string;
  quantity: number;
  price: number;
}

// Define the props for the Invoice component with appropriate types
interface InvoiceProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Invoice: React.FC<InvoiceProps> = ({ cart, setCart }) => {
  const { userData } = useUser();

  // Add type annotations to the parameters
  const calculateTotal = (quantity: number, price: number): number =>
    quantity * price;

  const totalAmount = cart.reduce(
    (acc: number, item: Product) =>
      acc + calculateTotal(item.quantity, item.price),
    0
  );

  const gst = totalAmount * 0.18;
  const grandTotal = totalAmount + gst;
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // Adding 15 days in milliseconds

  const handleDownload = async () => {
    try {
      const response = await fetch(
        "https://levitation-back.onrender.com/generate-invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Error downloading invoice:", err);
    }
  };

  const searchParams = new URLSearchParams(window.location.search);
  const isPdf = searchParams.get("pdf") === "true";

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `https://levitation-back.vercel.app/cart/${userData.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data: Product[] = await response.json();
      console.log("Fetched cart data:", data);
      setCart(data);
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
              <img src={logo} className="h-10 w-10" alt="Logo" />
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
          {cart.map((item: Product, index: number) => (
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
