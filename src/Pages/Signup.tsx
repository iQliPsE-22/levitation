import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Button from "../components/Button";

interface FormData {
  profilePicture: File | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("Welcome to Levitation");

  const [formData, setFormData] = useState<FormData>({
    profilePicture: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("SuccessFull");
      const formDataToSubmit = new FormData();
      formDataToSubmit.append(
        "profilePicture",
        formData.profilePicture as Blob
      );
      formDataToSubmit.append("firstName", formData.firstName);
      formDataToSubmit.append("lastName", formData.lastName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("password", formData.password);

      if (formData.password.length < 8) {
        setMessage("Password must be at least 8 characters long");
        return;
      }
      if (formData.password !== formData.confirm) {
        setMessage("Passwords do not match");
        return;
      }

      const response = await fetch(
        "https://levitation-back.onrender.com/signup",
        {
          method: "POST",
          body: formDataToSubmit,
        }
      );
      const data = await response.json();
      console.log(data);
      setFormData({
        profilePicture: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
      });
      if (data.message === "Admin created successfully") navigate("/login");
    } catch (error) {
      console.error("Error submitting admin data:", error);
    }
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-[125vh] bg-cover bg-fixed bg-gray-400 ">
      <div className="hidden lg:flex items-center justify-center w-full my-5 z-0 text-[10vw] md:text-[20rem]">
        <div className="back">
          <h1>Levitation</h1>
        </div>
      </div>
      <div>
        <form
          className="absolute flex flex-col gap-2 p-8 w-screen md:p-10 w-4/5 md:w-1/3 top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 rounded-md transition-opacity duration-1000 text-white z-10"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-2xl text-center mb-2 ">SIGN UP </h1>
          {message && (
            <h1
              className={`text-xl itim text-center text-white ${
                message !== "Welcome to Levitation" ? "text-red-500" : ""
              }`}
            >
              {message}
            </h1>
          )}
          <label htmlFor="dp">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="block text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-lg file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            onChange={handleProfilePictureChange}
            required
          />

          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-2 rounded-md border-none bg-gray-200 text-black"
            required
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-2 rounded-md border-none bg-gray-200 text-black"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 rounded-md border-none bg-gray-200 text-black"
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="p-2 rounded-md border-none bg-gray-200 text-black"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 rounded-md border-none bg-gray-200 text-black"
            required
          />

          <label htmlFor="confirm">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            onChange={handleInputChange}
            className="p-2 rounded-md border-none bg-gray-200 text-black"
          />
          <Button color="#6d28d9" hoverColor="#46198c">
            Sign Up
          </Button>

          <Link to="/login">
            <Button color="rgb(31 41 55)" hoverColor="#111827">
              Existing User? Login Here
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
