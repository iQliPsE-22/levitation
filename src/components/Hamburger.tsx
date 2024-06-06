import React, { useEffect } from "react";
import Button from "./Button";

interface HamburgerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".hamburger-menu")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 h-screen bg-black text-white p-4 w-1/3 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hamburger-menu`}
    >
      <h1 className="julius text-2xl text-center p-4">LOST YOUR WAY?</h1>
      <ul className="h-full flex flex-col justify-between">
        <div className="p-4 julius text-center ">
          <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
            Home
          </li>
          <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
            Dashboard
          </li>
          <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
            Invoice
          </li>
          <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
            Contact Us
          </li>
        </div>
        <div className="pb-16">
          <Button color="#404040" hoverColor="#303030">
            Profile
          </Button>
          <li className="mt-1">
            <Button color="red" hoverColor="#ff0000">
              Logout
            </Button>
          </li>
        </div>
      </ul>
      <button onClick={onClose} className="text-white mt-4">
        Close
      </button>
    </div>
  );
};

export default Hamburger;
