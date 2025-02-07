import React, { useState, useCallback } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger"; // Assuming you're using React Bootstrap

const NCommonOverlayTrigger = (props) => {
  const { children, popup, overlayClassName, overlayStyle } = props;

  const showTimer = 250;
  const hideTimer = 300;

  const [show, setShow] = useState(false);
  const [debounce, setDebounce] = useState(null);

  const handleOnMouseEnter = useCallback(() => {
    clearTimeout(debounce);
    setDebounce(setTimeout(() => setShow(true), showTimer));
  }, [debounce]);

  const handleOnMouseLeave = useCallback(() => {
    clearTimeout(debounce);
    setDebounce(setTimeout(() => setShow(false), hideTimer));
  }, [debounce]);

  // Default overlay styles and classnames
  const defaultOverlayClassName = "border m-3 p-3 rounded-4 bg-white shadow";
  const defaultOverlayStyle = { maxWidth: "24em", zIndex: 1070 };

  const overlay = (
    <div
      className={overlayClassName ?? defaultOverlayClassName}
      style={overlayStyle ?? defaultOverlayStyle}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {popup}
    </div>
  );

  return (
    <OverlayTrigger
      show={show}
      trigger={["hover", "focus"]}
      delay={{ show: showTimer, hide: hideTimer }}
      placement="auto"
      overlay={overlay}
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

export default NCommonOverlayTrigger;
