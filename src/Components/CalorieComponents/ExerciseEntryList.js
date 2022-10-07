import "./ExerciseEntryList.css";
import ExerciseEntryCard from "./Cards/ExerciseEntryCard";
import Table from "react-bootstrap/Table";

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
      <h2>Exercise Entries</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Exercise Name</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <ExerciseEntryCard
              key={Math.random()}
              removeEntry={props.removeEntry}
              date={entry._selectedDate}
              name={entry._nameOfExercise}
              calories={entry._caloriesAmount}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExerciseEntryList;
