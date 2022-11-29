import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board'
import Keyboard from './components/keyboard/Keyboard'
function App() {
  return (

    <div className="App">
      <Header />
      <Board />
      <Keyboard />
    </div>
  );
}

export default App;
