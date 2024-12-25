import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #D7D7DE;
  border-color: #D7D7DE;
  color: #232528;
`;

export function BlueButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
