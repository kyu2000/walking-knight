import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "../../Board/Board";
import PathFinder from "../../PathFinder";

function App() {
  const board = new Board(8);
  // eslint-disable-next-line
  const pf = new PathFinder(board);
  pf.start = { row: 0, col: 0 };
  pf.dest = { row: 0, col: 1 };
  console.log(pf.solve());

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
