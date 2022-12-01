import {useState} from 'react'
import './App.css'
import Board from './components/Board/Board';

function App() {
  const [cells, setCells] = useState<Array<number | null>>([...new Array(9 * 9)].map(() => null));

  const setCell = (index: number, value: number | null) => {
    const newCells = [...cells];
    newCells[index] = value;
    setCells(newCells);
  };

  return (
    <div className="board-container">
      <Board cells={cells} setCell={(index, value) => setCell(index, value)}/>
    </div>
  );
}

export default App;
