import "./WeightEntryCard.css";
import { CloseButton } from "react-bootstrap";

/**
 * @param props Props passed down by WeightEntries.js
 * @returns A single weight entry
 */
function WeightEntryCard(props) {
  return (
    <tr key={Math.random()}>
      <td>{props.weightEntry[0]}</td>
      <td>{props.weightEntry[1]}</td>
      <td>{0}</td>
      <td>
        {0}{" "}
        {
          <CloseButton
            onClick={() =>
              props.remove(props.weightEntry[0], props.weightEntry[1])
            }
            className="weight_entry_remove"
          />
        }
      </td>
    </tr>
  );
}

export default WeightEntryCard;
