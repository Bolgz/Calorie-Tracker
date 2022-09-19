import "./WeightEntry.css";
import { CloseButton } from "react-bootstrap";

function WeightEntry(props) {
  function removeWeightEntry() {}

  return (
    <div>
      {props.entries.map((weightEntry) => (
        <div
          className="weight_entry_card"
          key={weightEntry[0] + weightEntry[1]}
        >
          <p className="weight_entry_weight">{weightEntry[1]} Kg</p>
          <CloseButton
            className="weight_entry_remove"
            onClick={removeWeightEntry}
          />
          <p className="weight_entry_date">{weightEntry[0]}</p>
        </div>
      ))}
    </div>
  );
}

export default WeightEntry;
