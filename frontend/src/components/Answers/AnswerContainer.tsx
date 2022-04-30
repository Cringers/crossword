import React, { FormEvent, useMemo, memo, useState } from 'react';
import { useEffect } from 'react';
import styled from "styled-components";
import { Answer, Point } from '../../generated/generated';

const AnswerDiv = styled.div`
  width: 11em;
  display: flex;
  justify-content: left;
  align-items: left;
  background-color: transparent;
  caret-color: transparent;
`;

export type AnswerContainerProps = { type: string, answers: Map<number, Answer>, grid: Point[][] }
const AnswerContainer= ({type, answers, grid} : AnswerContainerProps) => {

  let [sortedAnswers, _] = useState(new Map([...answers].sort((a,b) => a[0]-b[0])))
  let [ answerDivs, setAnswerDivs] = useState<JSX.Element[]>([])

  useEffect(() => {
    let tmp = []
    for(const [number, answer] of sortedAnswers.entries() ){
      tmp.push((<AnswerDiv key={number}>{number+ ") " + answer.clue}</AnswerDiv>))
    }
    setAnswerDivs(tmp)
  }, [answers])
  return <>{type}{answerDivs}</>
};
export default AnswerContainer;
  