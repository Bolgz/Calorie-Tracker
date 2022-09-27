import "./CalorieEntryList.css";
import CalorieEntryCard from "./CalorieEntryCard";

function CalorieEntryList(props) {
  return (
    <div className="calorie-entry-list-container">
      <h3>Entries - {props.selectedDate}</h3>
      <div className="calorie-list-header-container">
        <p className="calorie-list-header-text">Name</p>
        <p className="calorie-list-header-text">Calories</p>
        <p className="calorie-list-header-text">Carbs</p>
        <p className="calorie-list-header-text">Fat</p>
        <p className="calorie-list-header-text">Protein</p>
        <p className="calorie-list-header-text"></p>
      </div>
      {props.entries.map((entry) => (
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
