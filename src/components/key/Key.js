import "./Key.css"

const Key = ({ letter }) => {

    const type = () => {
        console.log(letter)
    }

    return (
        <div className="key" onClick={type}>
            {letter}
        </div>
    )
}

export default Key;