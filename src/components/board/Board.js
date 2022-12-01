import "./Board.css"

const Board = ({ boardState }) => {

    return (
        <div className="board-container">
            <div className="board">
                {
                    boardState.map((row, index) => {
                        return (
                            <div key={index} className="row">
                                {row.map((box, index) => {
                                    return (
                                        <div key={index} className="box" style={{ backgroundColor: box.color }}>
                                            {box.letter}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Board