import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board'
import Keyboard from './components/keyboard/Keyboard'
import Modal from './components/modal/Modal';
import allWords from 'an-array-of-english-words'
import { words } from 'popular-english-words'
import { useState, useEffect } from 'react'
import { AiOutlineConsoleSql } from 'react-icons/ai';

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

	const row1 = []

	const row2 = []

	const row3 = []

	for (let i = 0; i < 10; i++) {
		if (i < 7) {
			row1.push("#818384")
			row2.push("#818384")
			row3.push("#818384")
		} else if (i < 9) {
			row1.push("#818384")
			row2.push("#818384")
		} else {
			row1.push("#818384")
		}
	}

	const letterToKeyboard = {
		Q: { row: 0, index: 0 },
		W: { row: 0, index: 1 },
		E: { row: 0, index: 2 },
		R: { row: 0, index: 3 },
		T: { row: 0, index: 4 },
		Y: { row: 0, index: 5 },
		U: { row: 0, index: 6 },
		I: { row: 0, index: 7 },
		O: { row: 0, index: 8 },
		P: { row: 0, index: 9 },
		A: { row: 1, index: 0 },
		S: { row: 1, index: 1 },
		D: { row: 1, index: 2 },
		F: { row: 1, index: 3 },
		G: { row: 1, index: 4 },
		H: { row: 1, index: 5 },
		J: { row: 1, index: 6 },
		K: { row: 1, index: 7 },
		L: { row: 1, index: 8 },
		Z: { row: 2, index: 0 },
		X: { row: 2, index: 1 },
		C: { row: 2, index: 2 },
		V: { row: 2, index: 3 },
		B: { row: 2, index: 4 },
		N: { row: 2, index: 5 },
		M: { row: 2, index: 6 },
	}


	const keyboardColorsArray = [row1, row2, row3]

	const [keyboardColors, setKeyboardColors] = useState(keyboardColorsArray)

	const [boardState, setBoardState] = useState(startingBoard)

	const [currentBox, setCurrentBox] = useState(0)

	const [currentBeginning, setCurrentBeginning] = useState(0)

	const [word, setWord] = useState("GIUST")

	const [disableKeyboard, setDisableKeyboard] = useState(false)

	const [displayModal, setDisplayModal] = useState("none")

	const [modalMessage, setModalMessage] = useState("")

	const changeModal = (display) => {
		setDisplayModal(display)
	}


	const allFiveLetterWords = allWords.filter(word => word.length === 5)
	const fiveLetterWords = words.getMostPopularLength(1000, 5)

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
				setCurrentBox(currentBox + 1)
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
				setCurrentBox(currentBox - 1)
			}
		}
	}

	const doubleCheck = (word) => {

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

	const changeKeyColor = (guessLetter, color) => {
		const colorImportence = {
			"#818384": 0,
			"#3a3a3c": 1,
			"#b59f3b": 2,
			"#538d4e": 3
		}

		const currentColor = keyboardColors[letterToKeyboard[guessLetter].row][letterToKeyboard[guessLetter].index]

		if (colorImportence[color] > colorImportence[currentColor]) {
			const newKeyboardColors = [...keyboardColors]
			newKeyboardColors[letterToKeyboard[guessLetter].row].splice([letterToKeyboard[guessLetter].index], 1, color)
			setKeyboardColors(newKeyboardColors)
		}

	}

	// const notWord = () => {
	// 	const row = Math.floor(currentBox / 5) - 1;
	// 	const wrongState = [...boardState]
	// 	for (let i = 0; i < 5; i++) {
	// 		wrongState[row][i].color = "red"
	// 	}
	// 	setBoardState(wrongState)
	// 	for (let i = 0; i < 5; i++) {
	// 		wrongState[row][i].color = "#000000"
	// 	}
	// 	setBoardState(wrongState)
	// }


	const checkWord = () => {
		const doubles = doubleCheck(word)
		const currentEnding = currentBeginning + 5


		if (currentBox === currentEnding) {

			const row = Math.floor(currentBox / 5) - 1;
			const exclude = []

			let guessWord = ''

			for (let i = 0; i < 5; i++) {
				guessWord += boardState[row][i].letter.toLocaleLowerCase()
			}

			if (allFiveLetterWords.includes(guessWord)) {

				for (let i = 0; i < 5; i++) {
					const guessLetter = boardState[row][i].letter
					const newBoardState = [...boardState]

					let doubleArrayIndex = 0
					doubles.forEach((letterObj, index) => {
						if (guessLetter === letterObj.letter) {
							doubleArrayIndex = index
						}
					})

					if (guessLetter === word[i]) {
						exclude.push(i)
						if (doubles[doubleArrayIndex].count > 0) {
							newBoardState[row][i].color = "#538d4e"
							setBoardState(newBoardState)
							changeKeyColor(guessLetter, "#538d4e")

							doubles[doubleArrayIndex].count -= 1
						}
					}

				}
				for (let i = 0; i < 5; i++) {
					const guessLetter = boardState[row][i].letter
					const newBoardState = [...boardState]

					let doubleArrayIndex = 0
					doubles.forEach((letterObj, index) => {
						if (guessLetter === letterObj.letter) {
							doubleArrayIndex = index
						}
					})

					if (!exclude.includes(i)) {
						if (word.includes(guessLetter)) {
							if (doubles[doubleArrayIndex].count > 0) {
								newBoardState[row][i].color = "#b59f3b"
								setBoardState(newBoardState)
								doubles[doubleArrayIndex].count -= 1
								changeKeyColor(guessLetter, "#b59f3b")
							} else {
								newBoardState[row][i].color = "#3a3a3c"
								setBoardState(newBoardState)
								changeKeyColor(guessLetter, "#3a3a3c")
							}
						} else {
							newBoardState[row][i].color = "#3a3a3c"
							setBoardState(newBoardState)
							changeKeyColor(guessLetter, "#3a3a3c")
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
			} else {
				const boxes = document.getElementsByClassName('row')[row].children
				for (let i = 0; i < boxes.length; i++) {
					boxes[i].className = "box invalid"
				}
				setTimeout(() => {
					for (let i = 0; i < boxes.length; i++) {
						boxes[i].className = "box"
					}
				}, 700)


			}
		}
	}

	const playAgain = () => {
		setWord(fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toUpperCase())
		setBoardState(startingBoard)
		setKeyboardColors(keyboardColorsArray)
		setCurrentBox(0)
		setCurrentBeginning(0)
		setDisableKeyboard(false)
		setDisplayModal("none")
	}

	return (
		<div className="App">
			<Header changeModal={changeModal} disableGraph={!disableKeyboard} />
			<div className='game-area'>
				<Modal word={word} modalMessage={modalMessage} displayModal={displayModal} changeModal={changeModal} playAgain={playAgain} />
				<Board boardState={boardState} />
				<Keyboard type={type} backspace={backspace} checkWord={checkWord} keyboardColors={keyboardColors} />
			</div>
		</div>
	);
}

export default App;
