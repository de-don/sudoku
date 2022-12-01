import './Cell.css';

interface CellProps {
  onClick: () => void;
  value: number | null;
  isActive: boolean;
  numsAvailable: number;
}

function Cell(props: CellProps) {
  const {isActive, value, onClick, numsAvailable} = props;

  const classes = ['cell', isActive ? 'active' : '', !value ? `available-${numsAvailable}` : ''];

  return (
    <div className={classes.join(' ')} onClick={onClick}>{value}</div>
  )
}

export default Cell;
