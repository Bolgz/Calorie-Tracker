import "./CalorieEntryList.css";
import CalorieEntryCard from "./Cards/CalorieEntryCard";
import Table from "react-bootstrap/Table";

/**
 * @param props Passed down from CalorieChart.js
 * @return A list of all food and exercise entries
 */
function CalorieEntryList(props) {
  //Filtered entries by selected date
  let filteredEntries;

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

  /**
   * Filters entries by selected date
   */
  function filterEntriesByDate() {
    filteredEntries = props.entries.filter(
      (entry) => entry._selectedDate === props.selectedDate
    );
  }

  filterEntriesByDate();

  return (
    <div className="calorie-entry-list-container">
      <h2>Food Entries</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Protein</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <CalorieEntryCard
              key={Math.random()}
              removeEntry={props.removeEntry}
              date={entry._selectedDate}
              name={entry._nameOfFood}
              calories={entry._caloriesAmount}
              carbs={entry._carbsAmount}
              fat={entry._fatAmount}
              protein={entry._proteinAmount}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CalorieEntryList;
