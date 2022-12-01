import {Component} from 'react'
import './App.css'
import {Board} from './components/Board';


interface AppState {
  cells: Array<null | number>;
}

export default class App extends Component<void, AppState> {
  constructor(props: void) {
    super(props);

    this.state = {
      cells: [...new Array(9 * 9)].map(() => null),
    };
  }

  render() {
    return (
      <div className="board-container">
        <Board cells={this.state.cells} setCell={(index, value) => this.setCell(index, value)}/>
      </div>
    )
  }

  private setCell(index: number, value: number | null): void {
    const cells = [...this.state.cells];
    cells[index] = value;
    this.setState({cells});
  }
}
