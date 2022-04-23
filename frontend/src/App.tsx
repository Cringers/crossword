import CrosswordBoxContainer from './components/VerticalWord/CrosswordBoxContainer';
import {Crossword, useCrosswordQuery } from './generated/generated';

function App() {
  const { data, loading } = useCrosswordQuery();
  console.log(data)

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
