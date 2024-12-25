import React from "react";
import styled from "styled-components";
import { Widget } from "near-social-vm";

const StyledNotificationWidget = styled.div`
  margin: 0 15px;
  background-color: #D7D7DE;
  height: 40px;
  width: 40px;
  border-radius: 50%;
transition: background-color 0.3s, color 0.3s;


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
      font-size: 18px !important;
    }
  }

  :hover {
    a,
    i {
      color: white;
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
