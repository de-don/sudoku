import {Component} from 'react';

interface CellProps {
  onClick: () => void;
  row: number;
  col: number;
  value: number | null;
  isActive: boolean;
}

export default class Cell extends Component<CellProps, {}> {
  render() {
    const {isActive, value, onClick} = this.props;
    return (
      <div className={isActive ? 'cell active' : 'cell'} onClick={onClick}>{value}</div>
    )
  }
}
