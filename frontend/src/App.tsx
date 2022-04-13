import React from 'react';
import CrosswordBoxContainer from './components/VerticalWord/CrosswordBoxContainer';
import { useQuery } from '@apollo/client'
import {TestQuery, TestDocument} from './generated/generated';
import {CrosswordQuery, CrosswordDocument} from './generated/generated';

function App() {
  const { data } = useQuery<TestQuery>(TestDocument)
  const grid = useQuery<CrosswordQuery>(CrosswordDocument)
  
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Ethan is?</h1>
      <CrosswordBoxContainer value="dralssa" />;
    </>
  );
}

export default App;
