import {Component} from 'react';
import Cell from './Cell';

import './Board.css';
import Numpad from './Numpad';


interface BoardProps {
  cells: Array<number | null>;
  setCell: (index: number, value: number | null) => void;
}

interface BoardState {
  activeCell: number | null;
}

export class Board extends Component<Readonly<BoardProps>, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      activeCell: null,
    };

    // Auto solver
    const interval = setInterval(() => {
      const map = new Map();

      for (let i = 0; i < 99; i++) {
        map.set(i, this.getAvailableNums(i));
      }

      const vals = [...map.entries()].filter(([index, options]) => options.length > 0);
      vals.sort(([index1, options1], [index2, options2]) => options1.length - options2.length);

      if (!vals.length) {
        clearInterval(interval);
        return;
      }

      const index = vals[0][0];
      const num = vals[0][1][0];

      this.props.setCell(index, num);
    }, 100);
  }

  render() {
    const cells = [...new Array(81)].map((_, index) => {
      return (
        <Cell
          numsAvailable={this.getAvailableNums(index).length}
          key={index}
          value={this.getCellValue(index)}
          isActive={this.isActive(index)}
          onClick={() => this.handleClick(index)}
        />
      );
    });


    return (
      <div>
        <div className="board">
          {cells}
        </div>

        {this.state.activeCell &&
          <Numpad onClick={num => this.setNum(num)} nums={this.getAvailableNums(this.state.activeCell)}></Numpad>}
      </div>
    )
  }

  private getAvailableNums(index: number): number[] {
    if (this.getCellValue(index)) {
      return [];
    }

    const row = Math.floor(index / 9);
    const col = index - row * 9;

    const nums = new Set();

    // Check horizontal row
    for (let i = 0; i < 9; i++) {
      const cellIndex = row * 9 + i;
      const val = this.getCellValue(cellIndex);
      nums.add(val);
    }

    // Check vertical row
    for (let i = 0; i < 9; i++) {
      const cellIndex = i * 9 + col;
      const val = this.getCellValue(cellIndex);
      nums.add(val);
    }

    // Check small square
    const smallRowStart = Math.floor(row / 3) * 3;
    const smallColStart = Math.floor(col / 3) * 3;
    for (let i = smallRowStart; i < smallRowStart + 3; i++) {
      for (let j = smallColStart; j < smallColStart + 3; j++) {
        const cellIndex = i * 9 + j;
        const val = this.getCellValue(cellIndex);
        nums.add(val);
      }
    }

    return [...new Array(9)].map((_, index) => index + 1).filter(v => !nums.has(v));
  }

  private setNum(num: number): void {
    if (this.state.activeCell === null) {
      return;
    }

    this.setState({activeCell: null})
    this.props.setCell(this.state.activeCell, num);
  }

  private handleClick(index: number): void {
    this.setState({activeCell: index})
  }

  private getCellValue(index: number): number | null {
    return this.props.cells[index];
  }

  private isActive(index: number): boolean {
    return this.state.activeCell === index;
  }
}
