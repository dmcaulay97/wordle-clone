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

	const [boardState, setBoardState] = useState(startingBoard)

	const [currentBox, setCuttentBox] = useState(0)

	const [currentBeginning, setCurrentBeginning] = useState(0)

	const [word, setWord] = useState("TITII")

	const [disableKeyboard, setDisableKeyboard] = useState(false)

	const type = (letter) => {
		if (!disableKeyboard) {
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
	}

	const backspace = () => {
		if (!disableKeyboard) {
			if (currentBox > currentBeginning) {
				let newBoardState = [...boardState];
				const row = Math.floor((currentBox - 1) / 5)
				const col = (currentBox - 1) % 5
				newBoardState[row][col].letter = ""
				setBoardState(newBoardState)
				setCuttentBox(currentBox - 1)
			}
		}
	}

	const doubleCheck = (word) => {
		let doubles = []

		for (let i = 0; i < word.length; i++) {
			for (let j = i + 1; j < word.length; j++) {
				if (word[i] === word[j]) {
					if (!doubles.includes(word[i])) {
						doubles.push(word[i])
					}
				}
			}
		}

		doubles = doubles.map((letter) => {
			return { letter: letter, count: 0 }
		})

		doubles.forEach((letterObj) => {
			for (let i = 0; i < word.length; i++) {
				if (word[i] === letterObj.letter) {
					letterObj.count += 1
				}
			}
		})

		return doubles
	}


	const checkWord = () => {
		const doubles = doubleCheck(word)
		const currentEnding = currentBeginning + 5


		if (currentBox === currentEnding) {

			const row = Math.floor(currentBox / 5) - 1;
			const exclude = []

			for (let i = 0; i < 5; i++) {
				const guessLetter = boardState[row][i].letter
				const newBoardState = [...boardState]

				let isDouble = false
				let doubleArrayIndex = 0
				doubles.forEach((letterObj, index) => {
					if (guessLetter === letterObj.letter) {
						isDouble = true
						doubleArrayIndex = index
					}
				})

				if (guessLetter === word[i]) {
					exclude.push(i)
					if (isDouble) {
						if (doubles[doubleArrayIndex].count > 0) {
							newBoardState[row][i].color = "#538d4e"
							setBoardState(newBoardState)
							doubles[doubleArrayIndex].count -= 1
						} else {
							newBoardState[row][i].color = "#3a3a3c"
							setBoardState(newBoardState)
						}
					} else {
						newBoardState[row][i].color = "#538d4e"
						setBoardState(newBoardState)
					}
				}

			}
			for (let i = 0; i < 5; i++) {
				const guessLetter = boardState[row][i].letter
				const newBoardState = [...boardState]

				let isDouble = false
				let doubleArrayIndex = 0
				doubles.forEach((letterObj, index) => {
					if (guessLetter === letterObj.letter) {
						isDouble = true
						doubleArrayIndex = index
					}
				})

				if (!exclude.includes(i)) {
					if (word.includes(guessLetter)) {
						if (isDouble) {
							if (doubles[doubleArrayIndex].count > 0) {
								newBoardState[row][i].color = "#b59f3b"
								setBoardState(newBoardState)
								doubles[doubleArrayIndex].count -= 1
							} else {
								newBoardState[row][i].color = "#3a3a3c"
								setBoardState(newBoardState)
							}
						} else {
							newBoardState[row][i].color = "#b59f3b"
							setBoardState(newBoardState)
						}
					} else {
						newBoardState[row][i].color = "#3a3a3c"
						setBoardState(newBoardState)
					}
				}

			}
			if (exclude.length === 5) {
				console.log("You Win")
				setDisableKeyboard(true)
			} else if (currentBeginning === 25) {
				console.log("Better Luck Next Time")
				setDisableKeyboard(true)
			} else {
				setCurrentBeginning(currentBeginning + 5)
			}

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
