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
      cells: [...new Array(9 * 9)].map((_, index) => index),
    };
  }

  render() {
    return (
      <Board cells={this.state.cells}/>
    )
  }
}
