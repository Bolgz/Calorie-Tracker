import "./CalorieDoughnut.css";
import { Doughnut } from "react-chartjs-2";
import { FaFlag } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa";
import { FaFire } from "react-icons/fa";

/**
 * @param props Props passed down from the CalorieChart.js component
 * @return The 'remaining calorie' doughnut along with the base goal, food and exercise icons & values
 */
function CalorieDoughnut(props) {
  //Total calories consumed on the selected day
  let totalCalories = 0;
  //Total calories burned on the selected day
  let totalExercise = 0;

  /**
   * Filter entries by selected date & then add up amount of calories consumed & calories burned
   */
  async function filterAndFindTotalCalories() {
    const filteredFoodEntries = props.foodEntries.filter(
      (entry) => entry._selectedDate === props.selectedDate
    );
    const filteredExerciseEntries = props.exerciseEntries.filter(
      (entry) => entry._selectedDate === props.selectedDate
    );
    filteredFoodEntries.forEach((entry) => {
      totalCalories += parseInt(entry._caloriesAmount);
    });
    filteredExerciseEntries.forEach((entry) => {
      totalExercise += parseInt(entry._caloriesAmount);
    });
  }

  filterAndFindTotalCalories().then(() => {
    props.setCalorieIntake(totalCalories);
  });

  //Graph options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  //Data passed to the calorie doughnut
  const data = {
    labels: ["Calories", "Remaining Calories"],
    datasets: [
      {
        data: [totalCalories, props.baseGoal - totalCalories + totalExercise],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(255, 99, 132, 0.25)"],
        borderColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  return (
    <div className="calorie-main-section">
      <Doughnut data={data} options={options} className="calorie-doughnut" />
      <div className="calories-remaining-text-container">
        <p className="calories-remaining-text-calories">
          {props.baseGoal - totalCalories + totalExercise}
        </p>
        <p className="calories-remaining-text-remaining">Remaining</p>
      </div>
      <div className="counter-section">
        <div>
          <FaFlag size={"20"} />
          <p className="counter-text">Base Goal</p>
          <p className="counter-value">{props.baseGoal}</p>
        </div>

        <div>
          <FaPizzaSlice size={"20"} />
          <p className="counter-text">Food</p>
          <p className="counter-value">{totalCalories}</p>
        </div>

        <div>
          <FaFire size={"20"} />
          <p className="counter-text">Exercise</p>
          <p className="counter-value">{totalExercise}</p>
        </div>
      </div>
    </div>
  );
}

export default CalorieDoughnut;
