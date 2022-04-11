import React, { FormEvent } from "react";

import styled from "styled-components";
import CrosswordInputBox from "./CrosswordInputBox";

const CrosswordContainer = styled.div`
  border-bottom: solid 1px black;
  width: fit-content;
  margin: auto;
`;

export type CrosswordBoxContainerProps = { value: string };
const CrosswordBoxContainer = ({ value }: CrosswordBoxContainerProps) => {
  const inputValue: string[] = new Array(value.length);

  const crosswordBoxInputHandler = (
    event: FormEvent<HTMLDivElement>,
    i: number
  ) => {
    if (event.currentTarget.textContent) {
      event.currentTarget.textContent = event.currentTarget?.textContent?.slice(
        0,
        1
      );
      inputValue[i] = event.currentTarget.textContent;
    }
    if (event.currentTarget.nextSibling) {
      (event.currentTarget.nextSibling as HTMLElement).focus();
    } else {
    }
    if (inputValue.join("") === value) {
      alert("success");
    }
  };
  const keyStrokeHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
    i: number
  ) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      (event.currentTarget as HTMLElement).textContent = "";
      inputValue[i] = "";
      return;
    }
    if (event.key === "ArrowUp" && event.currentTarget.previousSibling) {
      (event.currentTarget?.previousSibling as HTMLElement).focus();
    } else if (event.key === "ArrowDown" && event.currentTarget.nextSibling) {
      (event.currentTarget.nextSibling as HTMLElement).focus();
    }
  };
  return (
    <CrosswordContainer>
      {value.split("").map((_, i) => (
        <CrosswordInputBox
          key={i}
          onInput={(event) => crosswordBoxInputHandler(event, i)}
          onDelete={(event) => keyStrokeHandler(event, i)}
        />
      ))}
    </CrosswordContainer>
  );
};

export default CrosswordBoxContainer;
