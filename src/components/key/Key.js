import "./Key.css"

const Key = ({ letter, type }) => {

    return (
        <div className="key" onClick={() => { type(letter) }}>
            {letter}
        </div>
    )
}

export default Key;