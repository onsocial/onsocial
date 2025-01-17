import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logotype } from "../Logotype";
import { NavigationButton } from "../NavigationButton";
import { ArrowUpRight } from "../../icons/ArrowUpRight";
import { SignInButton } from "../SignInButton";
import { UserDropdown } from "./UserDropdown";
import { NotificationWidget } from "../NotificationWidget";
import { SearchWidget } from "../SearchWidget"; // Import the SearchWidget
import { PostButton } from "../../icons/PostButton";

const StyledNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  padding: 4px 0;
  border-bottom: 1px solid white;
  transition: transform 0.3s ease;
  height: 55px;

  &.hidden {
    transform: translateY(-100%);
  }

  .container {
    display: flex;
    align-items: center;
    height: 100%;

    .navigation-section {
      margin-left: 50px;
      display: flex;

      > div {
        > a {
          margin-right: 20px;
        }
      }
    }

    .user-section {
      margin-left: auto;
      display: flex;
      align-items: center;

      .nav-create-btn {
        margin-left: 10px;
      }

      .nav-sign-in-btn {
        margin-left: 10px;
      }
    }

    .arrow-up-right {
      margin-left: 4px;
    }

    .nav-notification-widget {
      margin-right: 20px;
    }

    .nav-search-widget {
      margin-right: 20px;
      margin-bottom: 1px;
    }
  }
`;

const PostButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px; /* Set the bottom distance */
  right: 20px; /* Set the right distance */
  z-index: 1001; /* Ensure it's above other content */
`;

export function DesktopNavigation(props) {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // Hide the top bar when scrolling down
      } else {
        setIsHidden(false); // Show the top bar when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <StyledNavigation className={isHidden ? "hidden" : ""}>
        <div className="container">
          <Link
            to="/"
            className="logo-link"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Logotype />
          </Link>
          <div className="navigation-section">
            <NavigationButton route="/">Home</NavigationButton>
            <NavigationButton route="/edit">Editor</NavigationButton>
            <NavigationButton href={props.documentationHref}>
              Docs
              <ArrowUpRight />
            </NavigationButton>
          </div>
          <div className="user-section">
            {props.signedIn && (
              <>
                <SearchWidget
                  className="nav-search-widget"
                  searchButtonSrc={props.widgets.searchButton}
                />
                <NotificationWidget
                  notificationButtonSrc={props.widgets.notificationButton}
                />
                <UserDropdown {...props} />
              </>
            )}
            {!props.signedIn && (
              <SignInButton onSignIn={() => props.requestSignIn()} />
            )}
          </div>
        </div>
      </StyledNavigation>

      {/* Always-visible PostButton */}
     <PostButtonWrapper>
  <Link to="/onsocial.near/widget/MainPage.N.Compose">
    <PostButton />
  </Link>
</PostButtonWrapper>
    </>
  );
}
