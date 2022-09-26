import "./CalorieDoughnut.css";
import { Doughnut } from "react-chartjs-2";
import { FaFlag } from "react-icons/fa";
import { FaPizzaSlice } from "react-icons/fa";
import { FaFire } from "react-icons/fa";

function CalorieDoughnut(props) {
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

  const data = {
    labels: ["Calories", "Remaining Calories"],
    datasets: [
      {
        data: [props.food, props.baseGoal - props.food + props.exercise],
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
          {props.baseGoal - props.food + props.exercise}
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
          <p className="counter-value">{props.food}</p>
        </div>

        <div>
          <FaFire size={"20"} />
          <p className="counter-text">Exercise</p>
          <p className="counter-value">{props.exercise}</p>
        </div>
      </div>
    </div>
  );
}

export default CalorieDoughnut;
