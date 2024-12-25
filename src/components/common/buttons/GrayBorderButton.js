import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #232528;
  border-color: #232528;
  border-radius: 50px;
  color: white;
max-height: 35px;
  display: flex; /* Enable flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Ensure text is centered */
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: black; /* Change to black on hover */
    border-color: black; /* Optionally change the border color on hover */
  }
`;


export function GrayBorderButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
