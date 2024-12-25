import React from "react";
import styled from "styled-components";
import { Widget } from "near-social-vm";

const StyledNotificationWidget = styled.div`
  margin: 0 15px;
  background-color: transparent;
  height:20px;
  width:20px;
  border-radius: 50%;



  > div,
  a {
    width: 100%;
    height: 100%;
  }

  a {
    color: #232528 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 20px !important;
    }
  }

  :hover {
    a,
    i {
      color: #D7D7DE; 
    }
  }
`;

export function NotificationWidget({ notificationButtonSrc }) {
  return (
    <StyledNotificationWidget className="nav-notification-widget">
      <Widget src={notificationButtonSrc} />
    </StyledNotificationWidget>
  );
}
