import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Invoice from "./Pages/Invoice";
import Header from "./components/Header";

interface Product {
  email: string;
  name: string;
  quantity: number;
  price: number;
}

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const LocationBasedHeader = () => {
    const location = useLocation();
    const noHeaderRoutes = ["/login", "/"]; // Add more routes as needed

    if (noHeaderRoutes.includes(location.pathname)) {
      return null;
    }

    return <Header />;
  };

  return (
    <div>
      <BrowserRouter>
        <LocationBasedHeader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route
            path="/dashboard"
            element={<Dashboard cart={cart} setCart={setCart} />}
          />
          <Route
            path="/invoice"
            element={<Invoice cart={cart} setCart={setCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
