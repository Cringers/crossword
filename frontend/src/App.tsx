import CrosswordBoxContainer from './components/VerticalWord/CrosswordBoxContainer';
import {Crossword, useCrosswordQuery } from './generated/generated';

function App() {
  const { data, loading } = useCrosswordQuery();

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Ethan is?</h1>
      {!loading && (
        <CrosswordBoxContainer crossword={data?.crossword as Crossword } />
      )}
      ;
    </>
  );
}

export default App;
