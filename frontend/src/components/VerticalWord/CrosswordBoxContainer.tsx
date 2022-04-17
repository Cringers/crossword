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
  const grid : Array<Array<string>> = new Array(crossword.grid.dimension);
  for(var i = 0; i < grid.length; i++){
    grid[i] = new Array(crossword.grid.dimension)
  }
  // Fill crossword grid with points
  crossword.grid.points.forEach(point => 
    grid[point.x][point.y] = point.value  
  )

  const crosswordBoxInputHandler = (
    event: FormEvent<HTMLDivElement>,
    cellNumber: number
  ) => {
    var columnIndex = cellNumber % crossword.grid.dimension
    var rowIndex = Math.floor(cellNumber/crossword.grid.dimension)

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
    var columnIndex = cellNumber % crossword.grid.dimension
    var rowIndex = Math.floor(cellNumber/crossword.grid.dimension)

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
      {grid.map( (row, i) => 
        <CrosswordRow>
          {row.map( (column, j) => 
            <CrosswordInputBox
              key={i + j}
              onInput={(event) => crosswordBoxInputHandler(event,  i + j)}
              onDelete={(event) => keyStrokeHandler(event, i + j)}
            />
          )}
        </CrosswordRow>
      )}
    </CrosswordContainer>
  );
};

export default CrosswordBoxContainer;
