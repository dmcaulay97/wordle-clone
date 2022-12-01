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
                                        <div key={index} className="box">
                                            {box}
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