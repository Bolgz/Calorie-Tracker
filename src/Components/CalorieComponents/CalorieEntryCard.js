import "./CalorieEntryCard.css";
import { CloseButton } from "react-bootstrap";

/**
 * @param props Passed down from CalorieEntryList.js
 * @return A card containing all information about a given entry & remove entry button
 */
function CalorieEntryCard(props) {
  /**
   * Removes item from the entry list
   */
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

  //Deciding wether to use food name (if food entry) or exercise name (if exercise entry)
  let nameToUse;
  if (props.name === undefined) {
    nameToUse = props.exercise;
  } else {
    nameToUse = props.name;
  }

  return (
    <div className="calorie_entry_card">
      <p className="calorie_entry_value">{nameToUse}</p>
      <p className="calorie_entry_value"> {props.calories}kcal</p>
      <p className="calorie_entry_value">{props.carbs}</p>
      <p className="calorie_entry_value">{props.fat}</p>
      <p className="calorie_entry_value">{props.protein}</p>
      <CloseButton
        className="weight_entry_remove"
        onClick={() => removeItem()}
      />
    </div>
  );
}

export default CalorieEntryCard;
