import "./Header.css";
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { ImStatsBars } from 'react-icons/im'
import { VscSettingsGear } from 'react-icons/vsc'

const Header = () => {
    return (
        <IconContext.Provider value={{ color: "#ffffff" }} >
            <header>
                <div className="menu">
                    <FaBars />
                </div>
                <div className="title">
                    Wordle
                </div>
                <div className="buttons">
                    <div className="button">
                        <AiFillQuestionCircle />
                    </div>
                    <div className="button">
                        <ImStatsBars />
                    </div>
                    <div className="button">
                        <VscSettingsGear />
                    </div>
                </div>
            </header>
        </IconContext.Provider >
    )
}

export default Header;