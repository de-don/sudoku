import {useEffect, useState} from 'react';
import Cell from '../Cell/Cell';

import './Board.css';
import Numpad from '../Numpad/Numpad';


interface BoardProps {
  cells: Array<number | null>;
  setCell: (index: number, value: number | null) => void;
}

function Board(props: BoardProps) {
  const [activeCell, setActiveCell] = useState<number | null>(null);

  const getCellValue = (index: number) => props.cells[index];
  const isActive = (index: number) => activeCell === index;

  function getAvailableNums(index: number): number[] {
    if (getCellValue(index)) {
      return [];
    }

    const row = Math.floor(index / 9);
    const col = index - row * 9;

    const nums = new Set();

    // Check horizontal row
    for (let i = 0; i < 9; i++) {
      const cellIndex = row * 9 + i;
      const val = getCellValue(cellIndex);
      nums.add(val);
    }

    // Check vertical row
    for (let i = 0; i < 9; i++) {
      const cellIndex = i * 9 + col;
      const val = getCellValue(cellIndex);
      nums.add(val);
    }

    // Check small square
    const smallRowStart = Math.floor(row / 3) * 3;
    const smallColStart = Math.floor(col / 3) * 3;
    for (let i = smallRowStart; i < smallRowStart + 3; i++) {
      for (let j = smallColStart; j < smallColStart + 3; j++) {
        const cellIndex = i * 9 + j;
        const val = getCellValue(cellIndex);
        nums.add(val);
      }
    }

    return [...new Array(9)].map((_, index) => index + 1).filter(v => !nums.has(v));
  }

  const setActiveCellValue = (value: number) => {
    if (activeCell === null) {
      return;
    }

    setActiveCell(null);
    props.setCell(activeCell, value);
  }


  useEffect(() => {
    // Auto solver
    const interval = setInterval(() => {
      const map = new Map();

      for (let i = 0; i < 99; i++) {
        map.set(i, getAvailableNums(i));
      }

      const vals = [...map.entries()].filter(([index, options]) => options.length > 0);
      vals.sort(([index1, options1], [index2, options2]) => options1.length - options2.length);

      if (!vals.length) {
        clearInterval(interval);
        return;
      }

      const index = vals[0][0];
      const num = vals[0][1][0];

      props.setCell(index, num);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  });


  const cells = [...new Array(81)].map((_, index) => {
    return (
      <Cell
        numsAvailable={getAvailableNums(index).length}
        key={index}
        value={getCellValue(index)}
        isActive={isActive(index)}
        onClick={() => setActiveCell(index)}
      />
    );
  });


  return (
    <div>
      <div className="board">
        {cells}
      </div>

      {activeCell &&
        <Numpad onClick={num => setActiveCellValue(num)} nums={getAvailableNums(activeCell)}></Numpad>}
    </div>
  )
}

export default Board;
