import styled from "styled-components";
import React from "react";
import { memo, FormEvent } from "react";

const CrosswordBox = styled.div`

  :empty:not(:focus):before{
    content:attr(placeholder);
    color: rgba(0, 0, 0, 0.5);
    
  }
  text-transform: uppercase;
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
  value: string;
  onInput?: (event: FormEvent<HTMLDivElement>) => void;
  onDelete: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
const CrosswordInput = React.forwardRef<HTMLDivElement,CrossWordInputBoxProps>(({ value, onDelete, onInput}, ref) => {
  return (
    <CrosswordBox ref={ref} placeholder={Number(value)? value : ""} contentEditable onInput={onInput} onKeyDown={onDelete}></CrosswordBox>
  );
});
const CrosswordInputBox = memo(CrosswordInput);
export default CrosswordInputBox;
