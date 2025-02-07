import React, { useState, useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const HoverPopup = ({ popup, children, overlayClassName, overlayStyle }) => {
  const showTimer = 250;
  const hideTimer = 300;
  const [show, setShow] = useState(false);
  let debounceTimer = null;

  const handleOnMouseEnter = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => setShow(true), showTimer);
  };

  const handleOnMouseLeave = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => setShow(false), hideTimer);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer); // Cleanup on unmount
  }, []);

  return (
    <OverlayTrigger
      show={show}
      trigger={["hover", "focus"]}
      delay={{ show: showTimer, hide: hideTimer }}
      placement="auto"
      overlay={
        <div
          className={overlayClassName ?? "border m-3 p-3 rounded-4 bg-white shadow"}
          style={overlayStyle ?? { maxWidth: "24em", zIndex: 1070 }}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          {popup}
        </div>
      }
    >
      <span
        className="d-inline-flex"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {children}
      </span>
    </OverlayTrigger>
  );
};

export default HoverPopup;
