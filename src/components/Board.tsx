import {Component} from 'react';
import Cell from './Cell';


interface BoardProps {
  cells: Array<number | null>;
}

interface BoardState {
  activeCell: number | null;
}

export class Board extends Component<Readonly<BoardProps>, BoardState> {
  constructor(props: BoardProps) {
    super(props);

    this.state = {
      activeCell: null,
    }
  }

  render() {
    const rows = [...new Array(9)].map((_, rowNum) => {
      const cols = [...new Array(9)].map((_, colNum) => {
        return (
          <Cell
            key={colNum}
            row={rowNum}
            col={colNum}
            value={this.getCellValue(rowNum, colNum)}
            isActive={this.isActive(rowNum, colNum)}
            onClick={() => this.handleClick(rowNum, colNum)}
          />
        );
      });

      return (
        <div key={rowNum} className="row">
          {cols}
        </div>
      )
    })

    return (
      <div className="board">
        {rows}
      </div>
    )
  }

  private fromCoordinates(row: number, col: number): number {
    return row * 9 + col;
  }

  private handleClick(rowNum: number, colNum: number): void {
    const index = this.fromCoordinates(rowNum, colNum);
    this.setState(state => ({...state, activeCell: index}))
  }

  private getCellValue(rowNum: number, colNum: number): number | null {
    const index = this.fromCoordinates(rowNum, colNum);
    return this.props.cells[index];
  }

  private isActive(rowNum: number, colNum: number): boolean {
    const index = this.fromCoordinates(rowNum, colNum);
    return this.state.activeCell === index;
  }
}
