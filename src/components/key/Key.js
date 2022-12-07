import "./Key.css"

const Key = ({ letter, type, color }) => {

    return (
        <div style={{ backgroundColor: color }} className="key" onClick={() => { type(letter) }}>
            {letter}
        </div>
    )
}

export default Key;