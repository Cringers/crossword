import React from 'react';
import CrosswordBoxContainer from './components/VerticalWord/CrosswordBoxContainer';
import { useQuery } from '@apollo/client';
import {
  CrosswordQuery,
  CrosswordDocument,
  useCrosswordQuery,
} from './generated/generated';

function App() {
  const { data: grid, loading } = useCrosswordQuery();

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Ethan is?</h1>
      {!loading && (
        <CrosswordBoxContainer value={grid?.crossword.name as string} />
      )}
      ;
    </>
  );
}

export default App;
