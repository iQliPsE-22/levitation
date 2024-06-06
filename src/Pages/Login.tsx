import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Button from "../components/Button";
import { useUser } from "../UserContext";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("Welcome to Levitation");
  const { setUserData } = useUser();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = (document.getElementById("user") as HTMLInputElement).value;
    const pass = (document.getElementById("pass") as HTMLInputElement).value;

    if (user === "" || pass === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        "https://levitation-back.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user, password: pass }),
        }
      );

      const data = await response.json();

      setUserData(data.admin);

      if (data.message === "Admin not found") {
        setMessage("User Not Found");
      } else if (data.message === "Invalid credentials") {
        setMessage("Invalid credentials");
      } else {
        console.log("Admin logged in successfully");
        setMessage("Login in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setMessage("Error logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-auto bg-cover bg-gray-400">
      <div className="hidden lg:flex items-center justify-center w-full my-5 z-0 text-[10vw] md:text-[20rem]">
        <div className="back">
          <h1>Levitation</h1>
        </div>
      </div>
      <form
        className="absolute flex flex-col gap-2 p-4 md:p-10 w-full min-h-fit md:w-4/5 lg:w-1/3 top-1/4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 rounded-md transition-opacity duration-1000 text-white z-10"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="login">
          <h1 className="text-2xl text-center mb-2 ">LOGIN </h1>
          {message && (
            <h1
              className={`itim text-center text-white ${
                message !== "Welcome to Levitation" ? "text-red-500" : ""
              }`}
            >
              {message}
            </h1>
          )}
        </label>
        <label htmlFor="admin-user">Email</label>
        <input
          type="text"
          id="user"
          name="userId"
          className="p-2 rounded-md border-none bg-gray-200 text-black"
          placeholder="Email"
        />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          name="password"
          className="p-2 rounded-md border-none bg-gray-200 text-black"
          placeholder="Password"
        />
        <Button color="#6d28d9" hoverColor="#46198c">
          Login
        </Button>
        <Link to="/">
          <Button color="rgb(31 41 55)" hoverColor="#111827">
            Not Registered ?
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
