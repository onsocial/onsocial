import React, { useCallback } from "react";
import { Widget, useNear, useAccount } from "near-social-vm";
import styled from "styled-components";
import { User } from "../../icons/User";
import { LogOut } from "../../icons/LogOut";
import { Withdraw } from "../../icons/Withdraw";
import { NavLink } from "react-router-dom";
import PretendModal from "../PretendModal";
import { Pretend } from "../../icons/Pretend";
import { StopPretending } from "../../icons/StopPretending";
import { QR } from "../../icons/QR";
import MobileQRModal from "../MobileQRModal";

const StyledDropdown = styled.div`
  button,
  a {
    font-weight: var(--font-weight-medium);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .dropdown-toggle {
    display: flex;
    align-items: center;
    text-align: left;
    background-color: white;
    border-radius: 50px;
    outline: none;
    border: 0;
    transition: background-color 0.3s ease;

    &:after {
      margin: 0 15px;
      border-top-color: #687076;
    }

    img {
      border-radius: 50% !important;
    }

    .profile-info {
      margin: 5px 10px;
      line-height: normal;
      max-width: 140px;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: #232528;
      }
      .profile-username {
        color: #687076;
      }
    }
  }

  ul {
    background-color: white;
    width: 100%;

    li {
      padding: 0 6px;
    }

    button,
    a {
      color: #232528;
      display: flex;
      align-items: center;
      border-radius: 50px;
      padding: 12px;
      transition: background-color 0.3s ease, color 0.3s ease;

      :hover,
      :focus {
        text-decoration: none;
        background-color: #59e692;
        color: #232528;

        svg {
          path {
            stroke: #232528;
          }
        }
      }

      svg {
        margin-right: 7px;
        min-width: 24px;
        path {
          stroke: #232528;
        }
      }
    }
  }
`;
export function UserDropdown(props) {
  const near = useNear();
  const account = useAccount();

  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, undefined, "1");
  }, [near]);

  const [showPretendModal, setShowPretendModal] = React.useState(false);
  const [showMobileQR, setShowMobileQR] = React.useState(false);

  return (
    <>
      <StyledDropdown className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenu2222"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Widget
            src={props.widgets.profileImage}
            props={{
              accountId: account.accountId,
              className: "d-inline-block",
              style: { width: "40px", height: "40px" },
            }}
          />
          <div className="profile-info">
            {props.widgets.profileName && (
              <div className="profile-name">
                <Widget src={props.widgets.profileName} />
              </div>
            )}
            <div className="profile-username">{account.accountId}</div>
          </div>
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenu2222"
          style={{ minWidth: "fit-content" }}
        >
          <li>
            <NavLink
              className="dropdown-item"
              type="button"
              to={`/${props.widgets.profilePage}?accountId=${account.accountId}`}
            >
              <User />
              My Profile
            </NavLink>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => withdrawStorage()}
            >
              <Withdraw />
              Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
            </button>
          </li>
        
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => props.logOut()}
            >
              <LogOut />
              Sign Out
            </button>
          </li>
        </ul>
      </StyledDropdown>
      {showPretendModal && (
        <PretendModal
          key="pretend-modal"
          show={showPretendModal}
          onHide={() => setShowPretendModal(false)}
          widgets={props.widgets}
        />
      )}
      {showMobileQR && (
        <MobileQRModal
          key="mobile-qr-modal"
          show={showMobileQR}
          onHide={() => setShowMobileQR(false)}
        />
      )}
    </>
  );
}
