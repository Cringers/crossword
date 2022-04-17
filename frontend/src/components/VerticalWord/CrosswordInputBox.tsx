import styled from "styled-components";
import React from "react";
import { memo, FormEvent } from "react";

const CrosswordBox = styled.div`
  background-color: white;
  border-top: black 1px solid;
  border-left: black 1px solid;
  border-right: black 1px solid;
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    background-color: gray;
  }
  caret-color: transparent;
`;

export type CrossWordInputBoxProps = {
  onInput?: (event: FormEvent<HTMLDivElement>) => void;
  onDelete: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
const CrosswordInput = ({ onDelete, onInput}: CrossWordInputBoxProps) => {
  return (
    <CrosswordBox contentEditable onInput={onInput} onKeyDown={onDelete}/>
  );
};
const CrosswordInputBox = memo(CrosswordInput);
export default CrosswordInputBox;
