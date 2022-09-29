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
    <div className="calorie_entry_card">
      <p className="calorie_entry_value">{props.name}</p>
      <p className="calorie_entry_value"> {props.calories}kcal</p>
      <CloseButton
        className="weight_entry_remove"
        onClick={() => removeItem()}
      />
    </div>
  );
}

export default ExerciseEntryCard;
