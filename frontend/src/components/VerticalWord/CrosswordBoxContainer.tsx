import React, { FormEvent } from 'react';

import styled from 'styled-components';
import CrosswordInputBox from './CrosswordInputBox';
import { Crossword } from '../../generated/generated';


const CrosswordContainer = styled.div`
  border-bottom: solid 1px black;
  width: fit-content;
  margin: auto;
`;
const CrosswordRow = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export type CrosswordBoxContainerProps = { crossword: Crossword };
const CrosswordBoxContainer = ({ crossword }: CrosswordBoxContainerProps) => {

  // Initialize empty crossword grid 
  const dimension : number = crossword.grid.dimension;
  const grid : Array<Array<string>> = new Array(dimension);
  for(var i = 0; i < grid.length; i++){
    grid[i] = new Array(dimension)
  }
  // Fill crossword grid with points
  crossword.grid.points.forEach(point => 
    grid[point.x][point.y] = point.value  
  )

  const crosswordBoxInputHandler = (
    event: FormEvent<HTMLDivElement>,
    cellNumber: number
  ) => {
    var columnIndex = cellNumber % dimension
    var rowIndex = Math.floor(cellNumber/dimension)

    var input : string | undefined = event?.currentTarget?.textContent?.at(0)
    grid[columnIndex][rowIndex] = input ? input : "";

    if (event.currentTarget.nextSibling) {
      (event.currentTarget.nextSibling as HTMLElement).focus();
    }
  };

  
  const keyStrokeHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
    cellNumber: number
  ) => {
    var columnIndex = cellNumber % dimension
    var rowIndex = Math.floor(cellNumber/dimension)

    if (event.key === 'Backspace' || event.key === 'Delete') {
      (event.currentTarget as HTMLElement).textContent = '';
      grid[columnIndex][rowIndex] = '';
      (event.currentTarget?.previousSibling as HTMLElement).focus();
      return;
    }
    if (event.key === 'ArrowUp' && event.currentTarget.previousSibling) {
      (event.currentTarget?.previousSibling as HTMLElement).focus();
    } else if (event.key === 'ArrowDown' && event.currentTarget.nextSibling) {
      (event.currentTarget.nextSibling as HTMLElement).focus();
    }
  };

  return (
    <CrosswordContainer>
      {grid.map( (row, i ) => 
        <CrosswordRow key={i}>
          {row.map( (column, j) =>{ 
            let cellIndex = i*dimension + j
            return <CrosswordInputBox
              key={cellIndex}
              onInput={(event) => crosswordBoxInputHandler(event, cellIndex)}
              onDelete={(event) => keyStrokeHandler(event, cellIndex)}
            />
           } )}
        </CrosswordRow>
      )}
    </CrosswordContainer>
  );
};

export default CrosswordBoxContainer;
