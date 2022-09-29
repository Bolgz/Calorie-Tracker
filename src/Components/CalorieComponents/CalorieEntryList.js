import "./CalorieEntryList.css";
import CalorieEntryCard from "./Cards/CalorieEntryCard";

/**
 * @param props Passed down from CalorieChart.js
 * @return A list of all food and exercise entries
 */
function CalorieEntryList(props) {
  //Filtered entries by selected date
  let filteredEntries;

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
      <div className="calorie-list-header-container">
        <p className="calorie-list-header-text">Name</p>
        <p className="calorie-list-header-text">Calories</p>
        <p className="calorie-list-header-text">Carbs</p>
        <p className="calorie-list-header-text">Fat</p>
        <p className="calorie-list-header-text">Protein</p>
        <p className="calorie-list-header-text"></p>
      </div>
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
    </div>
  );
}

export default CalorieEntryList;
