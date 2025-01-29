import React, { useState } from "react";

export function CommunitiesCreate() {
  const [hovered, setHovered] = useState(false);

  const fillColor = hovered ? "#82E299" : "#232528"; // Only changing fill color on hover
  const strokeColor = hovered ? "#82E299" : "#232528"; // Changing stroke color on hover
  const strokeWidth = 0.3; // Stroke width

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="24"
      fill="currentColor"
      className="bi bi-combined"
      viewBox="0 0 40 24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Plus Icon */}
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
        transform="scale(1.3) translate(-2, 1.5)" // Scale and adjust the position of the plus icon
        fill={fillColor} // Only fill color is used
        stroke={strokeColor} // Apply stroke color based on hover state
        strokeWidth={strokeWidth} // Apply stroke width
      />
      {/* People Icon (Updated) */}
      <path
        d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
        fill={fillColor} // Only fill color is used
        transform="scale(1.6) translate(8, -0.5)" // Scale and adjust the position of the updated people icon
      />
    </svg>
  );
}
