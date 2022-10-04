import "./CalorieEntryCard.css";
import { CloseButton } from "react-bootstrap";
import Table from "react-bootstrap/Table";

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
      <td>{props.calories}</td>
      <td>{props.carbs}</td>
      <td>{props.fat}</td>
      <td>
        {props.protein}{" "}
        <CloseButton
          className="calorie_entry_remove"
          onClick={() => removeItem()}
        />
      </td>
    </tr>
  );
}

export default CalorieEntryCard;
