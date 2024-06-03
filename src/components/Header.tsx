import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="julius text-black flex items-center justify-center bg-white w-full min-h-fit h-16 m-0 ">
      <h2>Levitation</h2>
      <Link to="/">
        <h2 className="text-2xl text-center">DASHBOARD</h2>
      </Link>
    </div>
  );
};

export default Header;
