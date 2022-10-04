import "./ExerciseEntryCard.css";
import { CloseButton } from "react-bootstrap";

function ExerciseEntryCard(props) {
  /**
   * Removes item from the entry list
   */
  function removeItem() {
    const object = {
      _selectedDate: props.date,
      _nameOfExercise: props.name,
      _caloriesAmount: props.calories,
    };
    props.removeEntry(object);
  }

  return (
    <tr key={Math.random()}>
      <td>{props.name}</td>
      <td>
        {props.calories}{" "}
        <CloseButton
          className="exercise_entry_remove"
          onClick={() => removeItem()}
        />
      </td>
    </tr>
  );
}

export default ExerciseEntryCard;
