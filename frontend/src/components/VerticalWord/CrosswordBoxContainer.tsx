import React, { FormEvent, useMemo } from 'react';

import styled from 'styled-components';
import CrosswordInputBox from './CrosswordInputBox';
import { Crossword } from '../../generated/generated';
import { useState } from 'react';
import CrosswordBlankBox from './CrosswordBlankBox';
import { useEffect } from 'react';


const CrosswordContainer = styled.div`
  border-bottom: solid 1px black;
  width: fit-content;
  margin: auto;
`;
const CrosswordRow = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const BLANK_CHARACTER : string = '.' // determines which cells in the answer should be empty

// Create a new empty string[][] filled with ''
function createBlankGrid(dimension: number) : string[][] {
  return Array(dimension).fill('').map(() =>(Array(dimension).fill('')));
}

// Create a deep copy of a string[][]
function deepCopy(array : string[][]) : string[][] {
  let dimension = array.length;
  var newArray : string [][] = createBlankGrid(dimension);
      for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++){
            newArray[i][j] = array[i][j]
        }
      }
  return newArray
}

// Compare two grids for equality
function checkAnswer(currentArray : string[][], answer : string[][]) : boolean {
  if(currentArray.length !== answer.length){
    return false
  }
  let isEqual = true
  for(let i = 0; i < currentArray.length; i++){
    for(let j = 0; j < currentArray.length; j++){
      if(currentArray[i][j] !== BLANK_CHARACTER && answer[i][j] !== BLANK_CHARACTER)
        isEqual &&= currentArray[i][j].toUpperCase() === answer[i][j].toUpperCase()
    }
  }
  return isEqual
}

export type CrosswordBoxContainerProps = { crossword: Crossword };
const CrosswordBoxContainer = ({ crossword }: CrosswordBoxContainerProps) => {  
  // Initialize empty crossword grid 
  const dimension : number = crossword.grid.dimension;
  const [grid, setGrid] = useState<string[][]>(createBlankGrid(dimension))
  
  // Initialize the answer grid 
  const answer = useMemo<string[][]>(() => {
    var tempAnswer : string [][] = createBlankGrid(dimension);
    crossword.grid.points.forEach((point) => {
       tempAnswer[point.y][point.x] = point.value
    })
    return tempAnswer
  }, [crossword, dimension] )
 
  // Check if the crossword is complete
  useEffect(() => {
    if(checkAnswer(grid, answer)){
      alert("success!")
    }
  }, [grid])

  // Update grid with newest input
  const crosswordBoxInputHandler = (
    event: FormEvent<HTMLDivElement>,
    cellNumber: number
  ) => {
    let columnIndex = cellNumber % dimension
    let rowIndex = Math.floor(cellNumber/dimension)
    let input : string | undefined = event?.currentTarget?.textContent?.at(0);
    setGrid(currentGrid => {
      var newGrid : string [][] = deepCopy(currentGrid)
      newGrid[rowIndex][columnIndex] = input ? input : currentGrid[rowIndex][columnIndex];
      return newGrid;
    });
    if (event.currentTarget.nextSibling) {
      (event.currentTarget.nextSibling as HTMLElement).focus();
    }
  };

  // On backspace/delete delete the current element from the grid
  const keyStrokeHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
    cellNumber: number
  ) => {
    let columnIndex = cellNumber % dimension
    let rowIndex = Math.floor(cellNumber/dimension)

    if (event.key === 'Backspace' || event.key === 'Delete') {
      (event.currentTarget as HTMLElement).textContent = '';

      setGrid(currentGrid => {
        let newGrid : string [][] = deepCopy(currentGrid);
        newGrid[columnIndex][rowIndex] =  "";
        return newGrid;
      });
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
      {answer.map( (row : string[], i : number) => 
        <CrosswordRow key={i}>
          {row.map( (letter : string, j : number) =>{ 
            let cellIndex = i*dimension + j
            if(letter === BLANK_CHARACTER) {
              return <CrosswordBlankBox key={cellIndex}/>
            } else {
              return  <CrosswordInputBox
                key={cellIndex}
                onInput={(event) => crosswordBoxInputHandler(event, cellIndex)}
                onDelete={(event) => keyStrokeHandler(event, cellIndex)}
              />
            }
          })}
        </CrosswordRow>
      )}
    </CrosswordContainer>
  );
};

export default CrosswordBoxContainer;
