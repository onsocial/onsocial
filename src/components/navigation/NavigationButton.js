import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavigationButton = styled.div`
  a {
    color: #232528;
    font-size: 16px;
    padding: 12px;
    border-radius: 50px;
    font-weight: var(--font-weight-bold);
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
 transition: background-color 0.3s, color 0.3s;

    &:hover,
    &.active {
      color: #232528;
      text-decoration: none;
      background-color: #59e692;
    }
  }
  &.disabled {
    opacity: 0.5;
  }
`;

export function NavigationButton(props) {
  return (
    <StyledNavigationButton className={props.disabled ? "disabled" : ""}>
      {props.route ? (
        <NavLink
          onClick={(e) => {
            if (props.disabled) {
              e.preventDefault();
            }
          }}
          to={props.route}
          exact={true}
        >
          {props.children}
        </NavLink>
      ) : (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      )}
    </StyledNavigationButton>
  );
}
