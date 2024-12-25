import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #232528;
  border-color: #232528;
border-radius: 50px;
  color: white;
`;

export function GrayBorderButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
