import "./Keyboard.css"
import { BsBackspace } from 'react-icons/bs'
import Key from "../key/Key"

const Keyboard = () => {
    const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"]


    return (
        <div className="keyboard">
            <div className="keyboard-row">
                {firstRow.map((letter, index) => (<Key key={index} letter={letter} />))}
            </div>
            <div className="keyboard-row">
                <div className="key half">
                </div>

                {secondRow.map((letter, index) => (<Key key={index} letter={letter} />))}

                <div className="key half">
                </div>
            </div>
            <div className="keyboard-row">
                <div className="key wide">
                    Enter
                </div>

                {thirdRow.map((letter, index) => (<Key key={index} letter={letter} />))}

                <div className="key wide back">
                    <BsBackspace />
                </div>
            </div>
        </div>
    )
}

export default Keyboard