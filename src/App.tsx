import {useState} from 'react'
import './App.css'
import Board from './components/Board/Board';
import {GRID_SIZE} from './constants/grid-size.const';

function App() {
  const initialArray = new Array(GRID_SIZE * GRID_SIZE).fill(null);
  const [cells, setCells] = useState<Array<number | null>>(initialArray);

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
