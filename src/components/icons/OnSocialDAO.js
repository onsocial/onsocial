import React, { useState } from "react";

export function OnSocialDAO() {
  const [hovered, setHovered] = useState(false);

  const strokeColor = hovered ? "#82E299" : "#232528";

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="425 105 155 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logotype"
    >
       <g>
 
  <ellipse stroke="#232528" stroke-width="20" ry="117.5" rx="117.5" id="svg_3" cy="255.49999" cx="503.09999" fill="none"/>
  <path stroke="#232528" stroke-width="20" id="svg_4" d="m503.10002,330.5c-41.43647,0 -75,-33.56354 -75,-75c0,-41.43647 33.56354,-75 75,-75c41.43647,0 75,33.56354 75,75c0,41.43647 -33.56354,75 -75,75z" opacity="undefined" fill="none"/>
 </g>
    </svg>
  );
}
