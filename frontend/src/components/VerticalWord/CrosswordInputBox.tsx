import styled from "styled-components";
import React from "react";
import { memo, FormEvent } from "react";



// Make style of focus a function of the current direction
export type CrosswordBoxStyleProps = {
  direction: string;
}
const CrosswordBox = styled.div<CrosswordBoxStyleProps>`
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
    background-color: transparent;
    outline: none;
    box-shadow:
      inset 0px 0px 0px 1px white, 
      inset 0px 0px 0px 2px ${props => props.direction === 'down'? 'red' : 'green'};
  }
  :focus::after{
    content: "";
    position: absolute;
    width: .8em;
    height: .8em;
    background: linear-gradient(to bottom right, ${({ direction }) => direction === 'down'? 'red' : 'green'} 50%, rgba(0,0,0,.5) 50%, transparent 52%);
    transform: rotate(${({direction}) => direction ==='down'? '-135deg': '135deg'}) translate(-.65em, -.65em);
    box-shadow: 0px 0px 0px -2px rgba(0, 0, 0, 0.5);
  }
  caret-color: transparent;
`;


export type CrossWordInputBoxProps = {
  direction: string | undefined;
  value: string;
  onInput?: (event: FormEvent<HTMLDivElement>) => void;
  onDelete: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};
const CrosswordInput = React.forwardRef<HTMLDivElement,CrossWordInputBoxProps>(({ direction, value, onDelete, onInput}, ref) => {
  return (
   <CrosswordBox direction={direction as string} ref={ref} placeholder={Number(value)? value : ""} contentEditable onInput={onInput} onKeyDown={onDelete}/> 
  );
});
const CrosswordInputBox = memo(CrosswordInput);
export default CrosswordInputBox;
