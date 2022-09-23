import "./WeightEntryCard.css";
import { CloseButton } from "react-bootstrap";

/**
 * @param props Props passed down by WeightEntries.js
 * @returns A single weight entry
 */
function WeightEntryCard(props) {
  return (
    <div
      className="weight_entry_card"
      key={props.weightEntry[0] + props.weightEntry[1]}
    >
      <p className="weight_entry_weight">{props.weightEntry[1]} Kg</p>
      <p className="weight_entry_date">{props.weightEntry[0]}</p>
      <CloseButton
        className="weight_entry_remove"
        onClick={() => props.remove(props.weightEntry[0], props.weightEntry[1])}
      />
    </div>
  );
}

export default WeightEntryCard;
