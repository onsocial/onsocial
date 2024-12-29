import React, { useCallback } from "react";
import styled from "styled-components";
import { Close } from "../../icons/Close";
import { Home } from "../../icons/Home";
import { UserCircle } from "../../icons/UserCircle";
import { LogOut } from "../../icons/LogOut";
import { Withdraw } from "../../icons/Withdraw";
import { Widget, useNear } from "near-social-vm";
import { NavigationButton } from "../NavigationButton";
import { SignInButton } from "../SignInButton";
import { Link } from "react-router-dom";

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  transition: 350ms;
  transform: translateX(-100%);

  &.show {
    transform: translateX(0);
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .left-side {
    flex: 80;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0px;
    overflow-x: auto;

    .nav-sign-in-btn {
      width: fit-content;
    }

    .profile-link {
      max-width: 100%;
      white-space: nowrap;

      :hover {
        text-decoration: none;
      }
    }

    img {
      border-radius: 50% !important;
    }

    .profile-name {
      color: #232528;
      font-weight: var(--font-weight-bold);
      margin-top: 5px;
    }

    .profile-username {
      color: #687076;
    }

    .profile-name,
    .profile-username {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .profile-section {
      margin-bottom: 0px;
      padding: 25px;
    }

    /* Hairline with padding inside */
    .hairline-wrapper {
      padding-left: 25px; /* Apply padding to the left */
      padding-right: 25px; /* Apply padding to the right */
    }

    .hairline {
      height: 1px;
      background-color: #eee;
margin-bottom: 20px;
    }
  }

  .top-links,
  .bottom-links {
    a,
    button {
      justify-content: flex-start;
      padding: 28px 0;
      display: flex;
      align-items: center;
      color: #232528;
      font-weight: var(--font-weight-bold);
      border-radius: 0;
      padding: 25px;

      svg {
        margin-right: 12px;
      }

      &.active,
      &:hover,
      &:focus {
        background-color: #59e692;
        text-decoration: none;
        transition: background-color 0.3s ease, color 0.3s ease;
        svg {
          path {
            stroke: #232528;
          }
        }
      }
    }
  }

  .top-links {
    margin-top: 10px;
  }

  .bottom-links {
    margin-top: auto;

    a,
    button {
      padding: 14px 10px 14px 25px; /* Apply 25px padding to the left */
      transition: background-color 0.3s ease, padding 0.3s ease;
      border-radius: 0px;
    }
  }

  .log-out-button {
    background: none;
    border: none;
    color: #232528;
    font-weight: var(--font-weight-bold);
    padding: 28px 0;

    svg {
      path {
        stroke: #232528;
      }
    }
  }

  .close-button {
    background: none;
    border: none;
    position: absolute;
    right: 16px;
    top: 16px;
    padding: 10px;

    svg {
      margin: 0;
    }
  }

  .right-side {
    flex: 20;
    opacity: 0.8;
    background-color: #232528;
  }
`;

export function Menu(props) {
  const near = useNear();
  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  return (
    <StyledMenu className={props.showMenu ? "show" : ""}>
      <div className="left-side">
        <div className="profile-section">
          {props.signedIn ? (
            <Link
              to={`/${props.widgets.profilePage}?accountId=${props.signedAccountId}`}
              className="profile-link"
            >
              <Widget
                src={props.widgets.profileImage}
                props={{
                  accountId: props.signedAccountId,
                  className: "d-inline-block",
                  style: { width: "56px", height: "56px" },
                }}
              />
              {props.widgets.profileName && (
                <div className="profile-name">
                  <Widget src={props.widgets.profileName} />
                </div>
              )}
              <div className="profile-username">{props.signedAccountId}</div>
            </Link>
          ) : (
            <SignInButton
              onSignIn={() => {
                props.onCloseMenu();
                props.requestSignIn();
              }}
            />
          )}
        </div>
        {/* Hairline with padding inside */}
        <div className="hairline-wrapper">
          <div className="hairline" />
        </div>
        <ul className="top-links">
          <li>
            <NavigationButton route="/">
              <Home />
              Home
            </NavigationButton>
          </li>
          <li>
            <NavigationButton
              disabled={!props.signedIn}
              route={`/${props.widgets.profilePage}?accountId=${props.signedAccountId}`}
            >
              <UserCircle />
              Profile
            </NavigationButton>

          </li>

        </ul>

        <ul className="bottom-links">
          {props.signedIn && (
            <>
{/* Hairline with padding inside */}
        <div className="hairline-wrapper">
          <div className="hairline" />
        </div>

              <li>
                <button
                  className="log-out-button"
                  onClick={() => withdrawStorage()}
                >

                  <Withdraw />
                  Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
                </button>
              </li>
              <li>
                <button
                  onClick={() => props.logOut()}
                  className="log-out-button"
                >
                  <LogOut />
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
        <button className="close-button" onClick={props.onCloseMenu}>
          <Close />
        </button>
      </div>
      <div className="right-side" onClick={props.onCloseMenu} />
    </StyledMenu>
  );
}
