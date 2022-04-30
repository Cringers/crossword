import styled from 'styled-components';
import AnswerContainer from './components/Answers/AnswerContainer';
import CrosswordBoxContainer from './components/VerticalWord/CrosswordBoxContainer';
import {Crossword, useCrosswordQuery } from './generated/generated';

function App() {
  const { data, loading } = useCrosswordQuery();
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{data?.crossword.name}</h1>
      {!loading && (
          <CrosswordBoxContainer crossword={data?.crossword as Crossword } />
      )}
    </>
  );
}

export default App;
