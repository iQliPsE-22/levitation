import React, { useState } from "react";

const Button = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      <button
        className="p-3 mt-2 text-white cursor-pointer rounded-lg w-full"
        style={{ backgroundColor: hovered ? props.hoverColor : props.color }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
