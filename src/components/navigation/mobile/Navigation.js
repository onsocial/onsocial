import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MobileMenuButton } from "./MobileMenuButton";
import { OnSocialLogo } from "../../icons/OnSocialLogo";
import { NotificationWidget } from "../NotificationWidget";
import { SignInButton } from "../SignInButton";
import { Communities } from "../../icons/Communities";
import { Message } from "../../icons/Message";
import { Search } from "../../icons/Search";
import { Home2 } from "../../icons/Home2";
import { Ai } from "../../icons/Ai";
import { Dots } from "../../icons/Dots";

// Styling for the top navigation (unchanged)
const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  background-color: ${({ scrolled }) => (scrolled ? 'white' : 'white')};
  transform: ${({ hide }) => (hide ? 'translateY(-100%)' : 'translateY(0)')};
  height: 48px;

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

  .nav-sign-in-btn:hover {
    background: black;
  }
`;



// Styling for the bottom navigation with padding from left and right edges and spacing between icons
const StyledBottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  padding: 0px 0px;  // 20px padding from left and right
  display: flex;
  justify-content: space-between;  // Evenly distribute icons
  align-items: center;
  background-color: white;
  border-top: 1px solid #eee;
  height: 48px;
  transform: ${({ hide }) => (hide ? 'translateY(100%)' : 'translateY(0)')};
  transition: transform 0.3s ease;
`;

const IconWrapper = styled.div`
  margin: 0 10px;  // Add margin between icons
`;

const IconContainer = styled.div`
  width: 100%;  // Take up the entire width of the bottom navigation
  display: flex;
  justify-content: space-between;  // Space out the icons evenly
  padding: 0 20px;  // Padding to ensure 20px from the left and right edges
`;

export function Navigation(props) {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hide, setHide] = useState(false); // For top bar visibility
  const [bottomHide, setBottomHide] = useState(false); // For bottom bar visibility

  useEffect(() => {
    const handleScroll = () => {
      // Handle top navigation bar visibility
      if (window.scrollY > lastScrollY) {
        setHide(true); // Scrolling down
      } else {
        setHide(false); // Scrolling up
      }

      // Handle bottom navigation bar visibility
      if (window.scrollY > lastScrollY) {
        setBottomHide(true); // Scrolling down
      } else {
        setBottomHide(false); // Scrolling up
      }

      setLastScrollY(window.scrollY);

      // Change background for top navigation when scrolling past 50px
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
  }, [lastScrollY]);

  return (
    <>
      <StyledNavigation scrolled={scrolled} hide={hide}>
        {props.signedIn ? (
          <MobileMenuButton
            onClick={props.onClickShowMenu}
            currentPage={props.currentPage}
          />
        ) : (
          <SignInButton
            className="nav-sign-in-btn"
            onSignIn={() => props.requestSignIn()}
          />
        )}

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
          
                        <IconWrapper>
              <Dots />

            </IconWrapper>
                    
        </div>
      </StyledNavigation>

      <StyledBottomNavigation hide={bottomHide}>
        <IconContainer>
          <IconWrapper>
            <Link to="/">
              <Home2 />
            </Link>
          </IconWrapper>

          <IconWrapper>
            <Link to="/onsocial.near/widget/Search.Tabs">
              <Search />
            </Link>
          </IconWrapper>

          <IconWrapper>
            <Link to="/onsocial.near/widget/Test2">
              <Communities />
            </Link>
          </IconWrapper>

          <IconWrapper>
            <Ai />
          </IconWrapper>

          <IconWrapper>
            <NotificationWidget
              className="nav-notification-widget"
              notificationButtonSrc={props.widgets.notificationButton}
            />
          </IconWrapper>

          <IconWrapper>
            <Link to="/onsocial.near/widget/Test2">
              <Message />
            </Link>
          </IconWrapper>
        </IconContainer>
      </StyledBottomNavigation>
    </>
  );
}
