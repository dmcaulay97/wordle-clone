import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board'
import Keyboard from './components/keyboard/Keyboard'
import { useState, useEffect } from 'react'

function App() {


  const startingBoard = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ]

  const [boardState, setBoardState] = useState(startingBoard)

  const type = (letter) => {
    let newBoardState = [...boardState];
    newBoardState[0].splice(0, 1, letter)
    setBoardState(newBoardState)
  }

  return (
    <div className="App">
      <Header />
      <div className='game-area'>
        <Board boardState={boardState} />
        <Keyboard type={type} />
      </div>
    </div>
  );
}

export default App;
