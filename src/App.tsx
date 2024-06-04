import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Invoice from "./Pages/Invoice";
interface Product {
  email: string;
  name: string;
  quantity: number;
  price: number;
}
const App = () => {
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route
            path="/dashboard"
            element={<Dashboard cart={cart} setCart={setCart} />}
          />
          <Route
            path="invoice"
            element={<Invoice cart={cart} setCart={setCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
