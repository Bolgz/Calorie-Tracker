import "./CalorieEntryCard.css";
import { CloseButton } from "react-bootstrap";

function CalorieEntryCard(props) {
  function removeItem() {
    const object = {
      _selectedDate: props.date,
      _nameOfFood: props.name,
      _caloriesAmount: props.calories,
      _carbsAmount: props.carbs,
      _fatAmount: props.fat,
      _proteinAmount: props.protein,
    };
    props.removeEntry(object);
  }

  return (
    <div className="calorie_entry_card">
      <p className="calorie_entry_value">{props.name}</p>
      <p className="calorie_entry_value">{props.calories}kcal</p>
      <p className="calorie_entry_value">{props.carbs}g</p>
      <p className="calorie_entry_value">{props.fat}g</p>
      <p className="calorie_entry_value">{props.protein}g</p>
      <CloseButton
        className="weight_entry_remove"
        onClick={() => removeItem()}
      />
    </div>
  );
}

export default CalorieEntryCard;
