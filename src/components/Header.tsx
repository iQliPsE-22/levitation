import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "../Assets/icons8-hamburger-menu.svg";
import Hamburger from "./Hamburger";

const Header: React.FC = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const location = window.location.pathname;
  return (
    <>
      <div className="flex items-center">
        <div className="ml-2">
          <button onClick={() => setShowHamburger(!showHamburger)}>
            <img src={HamburgerIcon} alt="hamburger menu" className="h-8 w-8" />
          </button>
        </div>
        <div className="julius text-black flex items-center justify-center bg-white w-full min-h-fit h-16 m-0 ">
          <h2>Levitation</h2>
          <Link to="/">
            <h2 className="text-2xl text-center">{location}</h2>
          </Link>
        </div>
      </div>
      <Hamburger
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
      />
    </>
  );
};

export default Header;
