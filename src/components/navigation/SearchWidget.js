import React from "react";
import styled from "styled-components";
import { Widget } from "near-social-vm";

const StyledSearchWidget = styled.div`
  margin-top: 3px;
`;

export function SearchWidget({ searchButtonSrc }) {
  return (
    <StyledSearchWidget className="nav-search-widget">
      <Widget src={searchButtonSrc} />
    </StyledSearchWidget>
  );
}
