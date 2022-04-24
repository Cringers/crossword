import React, { FormEvent, useMemo } from 'react';

import styled from 'styled-components';
import CrosswordInputBox from './CrosswordInputBox';
import { Crossword, Point } from '../../generated/generated';
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
function createBlankGrid(dimension: number) : Point[][] {

  return Array(dimension).fill(undefined as unknown as Point).map(() =>(Array(dimension).fill(undefined as unknown as Point)));
}

// Create a deep copy of a string[][]
function deepCopy(array : Point[][]) : Point[][] {
  let dimension = array.length;
  var newArray : Point [][] = createBlankGrid(dimension);
      for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++){
            newArray[i][j] = array[i][j]
        }
      }
  return newArray
}

// Compare two grids for equality
function checkAnswer(currentArray : Point[][], answer : Point[][]) : boolean {
  if(currentArray.length !== answer.length){
    return false
  }
  let isEqual = true
  for(let i = 0; i < currentArray.length; i++){
    for(let j = 0; j < currentArray.length; j++){
      if(currentArray[i][j].value !== BLANK_CHARACTER && answer[i][j].value !== BLANK_CHARACTER)
        isEqual &&= currentArray[i][j].value.toUpperCase() === answer[i][j].value.toUpperCase()
    }
  }
  return isEqual
}

export type CrosswordBoxContainerProps = { crossword: Crossword };
const CrosswordBoxContainer = ({ crossword }: CrosswordBoxContainerProps) => {  

  // Initialize empty crossword grid 
  const dimension : number = crossword.grid.dimension;
  
  // Initialize the template grid 
  const template = useMemo<Point[][]>(() => {
    let tempAnswer : Point [][] = createBlankGrid(dimension);
    crossword.grid.points.forEach((point) => {
       tempAnswer[point.y][point.x] = point
    })
    return tempAnswer
  }, [crossword, dimension] )
 
  // Initialize the answer grid 
  const answer = useMemo<Point[][]>(() => {
    var tempAnswer : Point [][] = createBlankGrid(dimension);
    crossword.grid.points.forEach((point) => {
       tempAnswer[point.y][point.x] = point
    })
    return tempAnswer
  }, [crossword, dimension] )

  const [grid, setGrid] = useState<Point[][]>(template)

  // Check if the crossword is complete
  useEffect(() => {
    console.log("grid", grid)
    console.log("answer",answer)
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
    event.currentTarget.textContent = event?.currentTarget?.textContent?.at(0) || "";
    let input : string  = event?.currentTarget?.textContent?.at(0) || "";
    setGrid(currentGrid => {
      var newGrid : Point [][] = deepCopy(currentGrid)
      newGrid[rowIndex][columnIndex].value = input ? input : currentGrid[rowIndex][columnIndex].value;
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
        let newGrid : Point [][] = deepCopy(currentGrid);
        newGrid[rowIndex][columnIndex].value =  "";
        return newGrid;
      });
      if(event.currentTarget?.previousSibling) {
        (event.currentTarget?.previousSibling as HTMLElement).focus();
      }
      return;
    }
    if (event.key === 'ArrowUp' && event?.currentTarget?.previousSibling) {
      (event.currentTarget?.previousSibling as HTMLElement).focus();
    } else if (event.key === 'ArrowDown' && event?.currentTarget?.nextSibling) {
      (event.currentTarget.nextSibling as HTMLElement).focus();
    }
  };

  return (
    <CrosswordContainer>
      {answer.map( (row, i) => 
        <CrosswordRow key={i}>
          {row.map( (point, j) =>{ 
            let cellIndex = i*dimension + j
            if(point.value === BLANK_CHARACTER) {
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
