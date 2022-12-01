import './Numpad.css';

interface NumpadProps {
  onClick: (num: number) => void;
  nums: number[];
}

function Numpad(props: NumpadProps) {
  const nums = props.nums.map((num) => (
    <button key={num} className="numpad-button" onClick={() => props.onClick(num)}> {num} </button>
  ))

  return (
    <div className="numpad-container">
      {nums}
    </div>
  )
}

export default Numpad;
