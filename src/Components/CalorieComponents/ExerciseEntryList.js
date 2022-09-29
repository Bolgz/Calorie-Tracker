import "./ExerciseEntryList.css";
import ExerciseEntryCard from "./Cards/ExerciseEntryCard";

function ExerciseEntryList(props) {
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
    <div className="exercise-entry-list-container">
      <h3>Exercise Entries</h3>
      <div className="exercise-list-header-container">
        <p className="exercise-list-header-text">Name</p>
        <p className="exercise-list-header-text">Calories Burned</p>
      </div>
      {filteredEntries.map((entry) => (
        <ExerciseEntryCard
          key={Math.random()}
          removeEntry={props.removeEntry}
          date={entry._selectedDate}
          name={entry._nameOfExercise}
          calories={entry._caloriesAmount}
        />
      ))}
    </div>
  );
}

export default ExerciseEntryList;
