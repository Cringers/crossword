import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client'
import {TestQuery, TestDocument} from './generated/generated';

function App() {
  const { data } = useQuery<TestQuery>(TestDocument)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Data: {data?.test.name}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
