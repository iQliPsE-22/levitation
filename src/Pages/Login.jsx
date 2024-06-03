import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = document.getElementById("admin-user").value;
    const pass = document.getElementById("pass").value;

    if (user === "" || pass === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        "https://backend-acasync.vercel.app/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user, password: pass }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.admin);
      if (data.message === "Admin not found") {
        alert("Admin not found");
      } else if (data.message === "Invalid credentials") {
        alert("Invalid credentials");
      } else {
        console.log("Admin logged in successfully");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("An error occurred. Please try again.");
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
        className="absolute flex flex-col gap-2 p-4 md:p-10 w-full md:w-4/5 lg:w-1/3 top-1/4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 rounded-md transition-opacity duration-1000 text-white z-10"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="login">
          <h1 className="text-2xl text-center">Login </h1>
        </label>
        <label htmlFor="admin-user">Email</label>
        <input
          type="text"
          id="admin-user"
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
        <input
          type="submit"
          value="Login"
          className="p-3 mt-5 bg-[#6d28d9] text-white cursor-pointer rounded-lg hover:bg-[#46198c]"
        />

        <Link to="/signup">
          <button className="p-3 mt-2 bg-gray-800 text-white cursor-pointer rounded-lg w-full hover:bg-gray-900">
            Not Registered?
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
