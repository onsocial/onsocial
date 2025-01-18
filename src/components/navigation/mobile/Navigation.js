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
import { PostButton } from "../../icons/PostButton";

const StyledNavigation = styled.div`
  font-family: 'Open Sans', sans-serif;
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
  background-color: ${({ scrolled }) => (scrolled ? "white" : "white")};
  transform: ${({ hide }) => (hide ? "translateY(-100%)" : "translateY(0)")};
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
const StyledBottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top: 1px solid #eee;
  height: 48px;
  transform: ${({ hide }) => (hide ? "translateY(100%)" : "translateY(0)")};
  transition: transform 0.3s ease;
`;

const IconWrapper = styled.div`
  margin: 0 10px;
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const StyledFloatingSVG = styled.div`
  position: fixed;
  bottom: ${({ isVisible }) => (isVisible ? "50px" : "30px")};
  right: 2px;
  z-index: 6;
  width: ${({ isVisible }) => (isVisible ? "72px" : "20px")};
  height: ${({ isVisible }) => (isVisible ? "72px" : "20px")};
  cursor: pointer;
  transition: bottom 0.3s ease, transform 0.3s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? "scale(1)" : "scale(0.1)")};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export function Navigation(props) {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hide, setHide] = useState(false); // Top bar visibility
  const [bottomHide, setBottomHide] = useState(false); // Bottom bar visibility
  const [showSVG, setShowSVG] = useState(true); // Floating SVG visibility

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHide(true); // Scrolling down
        setBottomHide(true);
        setShowSVG(false); // Hide SVG on scroll down
      } else {
        setHide(false); // Scrolling up
        setBottomHide(false);
        setShowSVG(true); // Show SVG on scroll up
      }
      setLastScrollY(window.scrollY);

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
            <Link to="/onsocial.near/widget/DAO.Tabs">
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
            <Link to="/onsocial.near/widget/PrivateMailbox">
              <Message />
            </Link>
          </IconWrapper>
        </IconContainer>
      </StyledBottomNavigation>

      <StyledFloatingSVG isVisible={showSVG}>
        <Link to="/onsocial.near/widget/MainPage.N.Compose">
          <PostButton />
        </Link>
      </StyledFloatingSVG>
    </>
  );
}
