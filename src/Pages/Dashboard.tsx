import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
interface Product {
  email: string;
  name: string;
  quantity: number;
  price: number;
}

const Dashboard: React.FC = () => {
  const { userData } = useUser();
  const [formData, setFormData] = useState<Product>({
    email: userData.email,
    name: "",
    quantity: 0,
    price: 0,
  });
  const [cart, setCart] = useState<Product[]>([]);
  const handleProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCart([...cart, formData]);
        setFormData({
          email: userData.email,
          name: "",
          quantity: 0,
          price: 0,
        });
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/${userData.email}`
      ); // Fetch cart data specific to the user
      const data = await response.json();
      console.log(data);
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
    <>
      <Header />
      <div className="container mx-auto p-4 text-white w-full min-h-dvh">
        <div className="flex items-center justify-around">
          <div className="w-1/2 bg-[#3b3b3b] h-full p-8 text-center rounded">
            <h2 className="julius text-2xl mb-4">Inventory</h2>
            <form
              className="bg-[#202020] rounded p-8 flex flex-col gap-4"
              onSubmit={handleProduct}
            >
              <input
                type="text"
                placeholder="Enter Your Item"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-3 rounded-md border-none bg-gray-200 text-black"
                required
              />
              <div className="flex items-center justify-center text-center">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      quantity: formData.quantity - 1,
                    })
                  }
                  className="w-1/4 rounded-md border-none bg-gray-200 text-black p-3"
                >
                  -
                </button>
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value, 10),
                    })
                  }
                  className="p-3 rounded-md border-none bg-[#202020] text-white w-1/2 text-center"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      quantity: formData.quantity + 1,
                    })
                  }
                  className="w-1/4 rounded-md border-none bg-gray-200 text-black p-3"
                >
                  +
                </button>
              </div>
              <input
                type="number"
                placeholder="Enter Rate"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="p-3 rounded-md border-none bg-gray-200 text-black"
                required
              />
              <Button color="#6d28d9" hoverColor="#7c3aed">
                Add to cart
              </Button>
            </form>
          </div>
          <div className="ml-2 w-1/2 bg-gray-900 min-h-full p-8 text-center rounded">
            <h2 className="julius text-2xl mb-4">Cart</h2>
            {cart.length > 0 ? (
              <table className="w-full bg-gray-800 text-white rounded-lg">
                <thead className="w-full">
                  <tr className="w-full bg-gray-900">
                    <th className="p-4 text-center">Product</th>
                    <th className="p-4 text-center">Quantity * Rate</th>
                    <th className="p-4 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">
                        {item.quantity} * {item.price}
                      </td>
                      <td className="p-4">{item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-900">
                    <td colSpan={2} className="p-4 text-left font-bold">
                      Subtotal
                    </td>
                    <td className="p-4 font-bold">
                      {cart.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}
                    </td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td colSpan={2} className="p-4 text-left font-bold">
                      GST (18%)
                    </td>
                    <td className="p-4 font-bold">
                      {(
                        cart.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        ) * 0.18
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td colSpan={2} className="p-4 text-left font-bold">
                      Grand Total
                    </td>
                    <td className="p-4 font-bold">
                      {(
                        cart.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        ) * 1.18
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p>No items in the cart</p>
            )}
            <Link to="/invoice">
              <Button color="black" hoverColor="black">
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
