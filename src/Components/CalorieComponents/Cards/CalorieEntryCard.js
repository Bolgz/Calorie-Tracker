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

  return (
    <tr key={Math.random()}>
      <td>{props.name}</td>
      <td>{props.calories}-Kcal</td>
      <td>{props.carbs}g</td>
      <td>{props.fat}g</td>
      <td>
        {props.protein}g{" "}
        <CloseButton
          className="calorie_entry_remove"
          onClick={() => removeItem()}
        />
      </td>
    </tr>
  );
}

export default CalorieEntryCard;
