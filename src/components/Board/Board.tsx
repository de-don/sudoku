import {useEffect, useState} from 'react';
import Cell from '../Cell/Cell';
import * as _ from 'lodash-es';

import './Board.css';
import Numpad from '../Numpad/Numpad';
import {GRID_SIZE, SQUARE_SIZE} from '../../constants/grid-size.const';

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

    const row = Math.floor(index / GRID_SIZE);
    const col = index - row * GRID_SIZE;

    const nums = new Set();

    const addCellValue = (row: number, col: number) => {
      const cellIndex = row * GRID_SIZE + col;
      const val = getCellValue(cellIndex);
      nums.add(val);
    }

    // Check vertical and horizontal rows
    for (let i = 0; i < GRID_SIZE; i++) {
      addCellValue(row, i);
      addCellValue(i, col);
    }

    // Check current square
    const smallRowStart = Math.floor(row / SQUARE_SIZE) * SQUARE_SIZE;
    const smallColStart = Math.floor(col / SQUARE_SIZE) * SQUARE_SIZE;
    for (let i = smallRowStart; i < smallRowStart + SQUARE_SIZE; i++) {
      for (let j = smallColStart; j < smallColStart + SQUARE_SIZE; j++) {
        addCellValue(i, j);
      }
    }

    return _.range(1, GRID_SIZE + 1).filter(v => !nums.has(v));
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

      for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        map.set(i, getAvailableNums(i));
      }

      const entries = [...map.entries()].filter(([, options]) => options.length > 0);
      entries.sort(([, options1], [, options2]) => options1.length - options2.length);

      if (!entries.length) {
        clearInterval(interval);
        return;
      }

      const index = entries[0][0];
      const num = entries[0][1][0];

      props.setCell(index, num);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  });


  const cells = [...new Array(GRID_SIZE * GRID_SIZE)].map((_, index) => {
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
