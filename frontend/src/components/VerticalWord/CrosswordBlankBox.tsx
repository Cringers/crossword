import styled from "styled-components";
import React from "react";
import { memo } from "react";

const CrosswordBox = styled.div`
  border-top: black 1px solid;
  border-left: black 1px solid;
  border-right: black 1px solid;  
  border-bottom: black 1px solid;

  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  caret-color: transparent;
`;


const CrosswordBlank= () => {
  return <CrosswordBox/>
};
const CrosswordBlankBox = memo(CrosswordBlank);
export default CrosswordBlankBox;
  