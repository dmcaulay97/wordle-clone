import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board'
import Keyboard from './components/keyboard/Keyboard'
import Modal from './components/modal/Modal';
import words from 'an-array-of-english-words'
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

	const [word, setWord] = useState("TITAN")

	const [disableKeyboard, setDisableKeyboard] = useState(false)

	const [displayModal, setDisplayModal] = useState("none")

	const [modalMessage, setModalMessage] = useState("")

	const changeModal = (display) => {
		setDisplayModal(display)
	}


	const fiveLetterWords = words.filter(word => word.length === 5)

	useEffect(() => {
		setWord(fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toUpperCase())
	}, [])

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
		// let doubles = []

		// for (let i = 0; i < word.length; i++) {
		// 	for (let j = i + 1; j < word.length; j++) {
		// 		if (word[i] === word[j]) {
		// 			if (!doubles.includes(word[i])) {
		// 				doubles.push(word[i])
		// 			}
		// 		}
		// 	}
		// }

		let letters = []

		for (let i = 0; i < word.length; i++) {
			if (!letters.includes(word[i])) {
				letters.push(word[i])
			}
		}

		const doubles = letters.map((letter) => {
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
		console.log(word)
		const doubles = doubleCheck(word)
		const currentEnding = currentBeginning + 5


		if (currentBox === currentEnding) {

			const row = Math.floor(currentBox / 5) - 1;
			const exclude = []

			for (let i = 0; i < 5; i++) {
				const guessLetter = boardState[row][i].letter
				const newBoardState = [...boardState]

				// let isDouble = false
				let doubleArrayIndex = 0
				doubles.forEach((letterObj, index) => {
					if (guessLetter === letterObj.letter) {
						// isDouble = true
						doubleArrayIndex = index
					}
				})

				if (guessLetter === word[i]) {
					exclude.push(i)
					// if (isDouble) {
					if (doubles[doubleArrayIndex].count > 0) {
						newBoardState[row][i].color = "#538d4e"
						setBoardState(newBoardState)
						doubles[doubleArrayIndex].count -= 1
					} else {
						newBoardState[row][i].color = "#3a3a3c"
						setBoardState(newBoardState)
					}
					// } else {
					// 	newBoardState[row][i].color = "#538d4e"
					// 	setBoardState(newBoardState)
					// }
				}

			}
			for (let i = 0; i < 5; i++) {
				const guessLetter = boardState[row][i].letter
				const newBoardState = [...boardState]

				// let isDouble = false
				let doubleArrayIndex = 0
				doubles.forEach((letterObj, index) => {
					if (guessLetter === letterObj.letter) {
						// isDouble = true
						doubleArrayIndex = index
					}
				})

				if (!exclude.includes(i)) {
					if (word.includes(guessLetter)) {
						// if (isDouble) {
						if (doubles[doubleArrayIndex].count > 0) {
							newBoardState[row][i].color = "#b59f3b"
							setBoardState(newBoardState)
							doubles[doubleArrayIndex].count -= 1
						} else {
							newBoardState[row][i].color = "#3a3a3c"
							setBoardState(newBoardState)
						}
						// } else {
						// 	newBoardState[row][i].color = "#b59f3b"
						// 	setBoardState(newBoardState)
						// }
					} else {
						newBoardState[row][i].color = "#3a3a3c"
						setBoardState(newBoardState)
					}
				}

			}
			if (exclude.length === 5) {
				setModalMessage("You Win")
				setDisableKeyboard(true)
				setDisplayModal("flex")
			} else if (currentBeginning === 25) {
				setModalMessage("Better Luck Next Time")
				setDisableKeyboard(true)
				setDisplayModal("flex")
			} else {
				setCurrentBeginning(currentBeginning + 5)
			}

		}
	}

	return (
		<div className="App">
			<Header changeModal={changeModal} disableGraph={!disableKeyboard} />
			<div className='game-area'>
				<Modal word={word} modalMessage={modalMessage} displayModal={displayModal} changeModal={changeModal} />
				<Board boardState={boardState} />
				<Keyboard type={type} backspace={backspace} checkWord={checkWord} />
			</div>
		</div>
	);
}

export default App;
