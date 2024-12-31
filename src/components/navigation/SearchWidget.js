import React from "react";
import styled from "styled-components";
import { Widget } from "near-social-vm";

const StyledSearchWidget = styled.div`
 margin: 0 15px;

`;

export function SearchWidget({ searchButtonSrc }) {
  return (
    <StyledSearchWidget className="nav-search-widget">
      <Widget src={searchButtonSrc} />
    </StyledSearchWidget>
  );
}
