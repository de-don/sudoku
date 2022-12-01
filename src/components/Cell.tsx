import {Component} from 'react';

interface CellProps {
  onClick: () => void;
  value: number | null;
  isActive: boolean;
  numsAvailable: number;
}

export default class Cell extends Component<CellProps, {}> {
  render() {
    const {isActive, value, onClick, numsAvailable} = this.props;

    const classes = ['cell', isActive ? 'active' : '', !value ? `available-${numsAvailable}` : '' ];

    return (
      <div className={classes.join(' ')} onClick={onClick}>{value}</div>
    )
  }
}
