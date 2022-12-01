import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board'
import Keyboard from './components/keyboard/Keyboard'
import { useState, useEffect } from 'react'

function App() {

  const startingBoard = []

  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 5; j++) {
      row.push(
        {
          letter: "",
          color: "#000000",
        }
      )
    }
    startingBoard.push(row)
  }

  // const startingBoard = [
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""],
  //   ["", "", "", "", ""]
  // ]

  const [boardState, setBoardState] = useState(startingBoard)

  const [currentBox, setCuttentBox] = useState(0)

  const [currentBeginning, setCurrentBeginning] = useState(0)

  const [word, setWord] = useState("FARTS")

  const type = (letter) => {
    const currentEnding = currentBeginning + 5
    if (currentBox < currentEnding) {
      let newBoardState = [...boardState];
      const row = Math.floor(currentBox / 5)
      const col = currentBox % 5
      newBoardState[row][col].letter = letter
      setBoardState(newBoardState)
      setCuttentBox(currentBox + 1)
    }
  }

  const backspace = () => {
    if (currentBox > currentBeginning) {
      let newBoardState = [...boardState];
      const row = Math.floor((currentBox - 1) / 5)
      const col = (currentBox - 1) % 5
      newBoardState[row][col].letter = ""
      setBoardState(newBoardState)
      setCuttentBox(currentBox - 1)
    }
  }

  const checkWord = () => {
    const currentEnding = currentBeginning + 5
    if (currentBox === currentEnding) {
      const row = Math.floor(currentBox / 5) - 1;
      for (let i = 0; i < 5; i++) {
        const guessLetter = boardState[row][i].letter
        const newBoardState = [...boardState]
        if (guessLetter === word[i]) {
          newBoardState[row][i].color = "#538d4e"
          setBoardState(newBoardState)
        } else if (word.includes(guessLetter)) {
          newBoardState[row][i].color = "#b59f3b"
          setBoardState(newBoardState)
        }
      }
      setCurrentBeginning(currentBeginning + 5);
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='game-area'>
        <Board boardState={boardState} />
        <Keyboard type={type} backspace={backspace} checkWord={checkWord} />
      </div>
    </div>
  );
}

export default App;
