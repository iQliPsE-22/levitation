// import React from "react";
import logo from "../Assets/levi.png";
const Invoice = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-xl font-bold">INVOICE</h1>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div>
            <div className="flex ">
              <img src={logo} className="h-10 w-10" />
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
          <tr>
            <td className="py-2">Product 1</td>
            <td className="py-2 text-blue-600">34</td>
            <td className="py-2">120</td>
            <td className="py-2 text-right">INR 4,080</td>
          </tr>
          <tr>
            <td className="py-2">Product 2</td>
            <td className="py-2 text-blue-600">34</td>
            <td className="py-2">120</td>
            <td className="py-2 text-right">INR 4,080</td>
          </tr>
          <tr>
            <td className="py-2">Product 1</td>
            <td className="py-2 text-blue-600">34</td>
            <td className="py-2">120</td>
            <td className="py-2 text-right">INR 4,080</td>
          </tr>
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
            <p>INR 4,080</p>
            <p>18%</p>
            <p className="text-blue-600 font-bold text-xl">₹ 108009</p>
          </div>
        </div>
        <p className="mt-8 text-gray-500">
          Valid until: <span className="font-bold">12/04/23</span>
        </p>
      </div>
      <div className="mt-8 bg-gray-800 text-white p-4 rounded-md">
        <p className="font-bold">Terms and Conditions</p>
        <p className="text-gray-300">
          we are happy to supply any further information you may need and trust
          that you call on us to fill your order. which will receive our prompt
          and careful attention
        </p>
      </div>
    </div>
  );
};

export default Invoice;
