import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MobileMenuButton } from "./MobileMenuButton";
import { OnSocialLogo } from "../../icons/OnSocialLogo";
import { NotificationWidget } from "../NotificationWidget";
import { SearchWidget } from "../SearchWidget";
import { SignInButton } from "../SignInButton";

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  background-color: ${({ scrolled }) => (scrolled ? 'white' : 'white')};
  transform: ${({ hide }) => (hide ? 'translateY(-100%)' : 'translateY(0)')};
  height: 48px;  // Limit the height of the navbar

  .logo-link {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }

  .nav-notification-widget {
    margin: 0;
  }

  .nav-search-widget {
    margin: 0;
    margin-right: 20px; /* Add margin to position it 20px to the left of notification icon */
  }

  .nav-sign-in-btn {
    // Styling for the sign-in button
  }

  .nav-sign-in-btn:hover {
    background: black; /* Change to black on hover */
  }
`;

export function Navigation(props) {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);  // To track the last scroll position
  const [hide, setHide] = useState(false); // To control visibility of the navbar

  // Scroll event handler to track scrolling direction and position
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down, hide the navbar, if scrolling up, show the navbar
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setHide(true);
      } else {
        // Scrolling up
        setHide(false);
      }

      // Update last scroll position
      setLastScrollY(window.scrollY);

      // Change background when scrolling down past 50px
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Dependency on last scroll position to track direction

  return (
    <StyledNavigation scrolled={scrolled} hide={hide}>
      <MobileMenuButton
        onClick={props.onClickShowMenu}
        currentPage={props.currentPage}
      />
      <Link
        to="/"
        className="logo-link"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <OnSocialLogo />
      </Link>

      <div className="d-flex">
        <SearchWidget
          className="nav-search-widget"
          searchButtonSrc={props.widgets.searchButton}
        />
        {props.signedIn ? (
          <NotificationWidget
            className="nav-notification-widget"
            notificationButtonSrc={props.widgets.notificationButton}
          />
        ) : (
          <SignInButton className="nav-sign-in-btn" onSignIn={() => props.requestSignIn()} />
        )}
      </div>
    </StyledNavigation>
  );
}
