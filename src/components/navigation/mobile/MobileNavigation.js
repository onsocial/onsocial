import React, { useState, useEffect } from "react";
import { Navigation } from "./Navigation";
import { Menu } from "./Menu";
import { useLocation } from "react-router-dom";
import useScrollBlock from ".././../../hooks/useScrollBlock";

export function MobileNavigation(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    setShowMenu(false);
    getCurrentPage();
    allowScroll();
  }, [location.pathname, location.search]);

  const getCurrentPage = () => {
    // Check if the URL contains the query parameter for the OnSocial DAO page
    const params = new URLSearchParams(location.search);
    const daoId = params.get("daoId");

    if (daoId === "onsocial.sputnik-dao.near") {
      return setCurrentPage("OnSocial DAO");
    }

    switch (location.pathname) {
      case "/":
        return setCurrentPage("Home");
      case `/${props.widgets.profilePage}`:
        return setCurrentPage("Profile");
      case `/${props.widgets.search}`:
        return setCurrentPage("Search");
      case `/${props.widgets.daos}`:
        return setCurrentPage("Communities");
      case `/${props.widgets.ai}`:
        return setCurrentPage("Ai");
      case `/${props.widgets.messages}`:
        return setCurrentPage("Messages");
      case `/${props.widgets.notifications}`:
        return setCurrentPage("Notifications");
      case `/${props.widgets.onsocial}`:
        return setCurrentPage("OnSocial DAO");
      case `/${props.widgets.communities}`:
        return setCurrentPage("Communities");
      case `/${props.widgets.marketplace}`:
        return setCurrentPage("Marketplace");

      case "/edit":
        return setCurrentPage("Create");
      default:
        return setCurrentPage("");
    }
  };

  return (
    <>
      <Navigation
        {...props}
        currentPage={currentPage}
        onClickShowMenu={() => {
          setShowMenu(true);
          blockScroll();
        }}
      />
      <Menu
        {...props}
        showMenu={showMenu}
        onCloseMenu={() => {
          setShowMenu(false);
          allowScroll();
        }}
      />
    </>
  );
}
