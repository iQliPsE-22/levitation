import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className="p-3 mt-2 bg-gray-800 text-white cursor-pointer rounded-lg w-full hover:bg-gray-900">
        {props.children}
      </button>
    </div>
  );
};

export default Button;
