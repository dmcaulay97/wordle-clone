import './Modal.css'

const Modal = ({ displayModal, changeModal, modalMessage, word }) => {

    return (
        <div className='modal' style={{ display: displayModal }}>
            <div className='message'>
                {modalMessage}
            </div>
            <div className='word'>
                {`The Word Was: ${word}`}
            </div>
            <div className="play-agian-button">
                Play Again
            </div>
            <div className="hide" onClick={() => { changeModal("none") }}>
                [x]
            </div>
        </div>
    )
}

export default Modal
