import {Component} from 'react';
import './Numpad.css';

interface NumpadProps {
  onClick: (num: number) => void;
  nums: number[];
}

export default class Numpad extends Component<NumpadProps, any> {
  render() {
    const nums = this.props.nums.map((num) => (
      <button key={num} className="numpad-button" onClick={() => this.props.onClick(num)}> {num} </button>
    ))

    return (
      <div className="numpad-container">
        {nums}
      </div>
    )
  }
}
