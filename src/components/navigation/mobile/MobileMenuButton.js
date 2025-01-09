import React from "react";
import styled from "styled-components";
import { Widget } from "near-social-vm"; // Import Widget

const StyledMobileMenuButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: #232528;
  font-weight: var(--font-weight-bold);
  padding: 0;

  .menu {
 
  
    margin-right: 10px;
  }
`;

export function MobileMenuButton(props) {
  return (
    <StyledMobileMenuButton onClick={props.onClick}>
      <div className="menu">
        {/* Use the correct widget source for the profile image */}
        <Widget src="mob.near/widget/ProfileImage" 
	props={{
                  accountId: props.signedAccountId,
                  className: "d-inline-block",
                  style: { width: "28px", height: "28px" },
                }}
/>
      </div>
      {props.currentPage}
    </StyledMobileMenuButton>
  );
}
