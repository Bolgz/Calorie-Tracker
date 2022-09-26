import "./MacroDoughnut.css";
import { Doughnut } from "react-chartjs-2";
import { GiFrenchFries } from "react-icons/gi";
import { GiCupcake } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";

function MacroDoughnut(props) {
  let carbAllowance;
  let proteinAllowance;
  let fatAllowance;

  function calculateMacrosAllowance(props) {
    //How many calories of carb can have a day (carbs contain 4 calories per gram)
    const carbAllowanceCalories = props.baseGoal * props.baseCarbs;
    //Total grams of carbs allowed per day
    carbAllowance = Math.round(carbAllowanceCalories / 4);

    //How many calories of protein can have a day (proteins contain 4 calories per gram)
    const proteinAllowanceCalories = props.baseGoal * props.baseProteins;
    //Total grams of protein allowed per day
    proteinAllowance = Math.round(proteinAllowanceCalories / 4);

    //How many calories of fat can have a day (fat contain 9 calories per gram)
    const fatAllowanceCalories = props.baseGoal * props.baseFats;
    //Total grams of fat allowed per day
    fatAllowance = Math.round(fatAllowanceCalories / 9);

    console.log(carbAllowance, proteinAllowance, fatAllowance);
  }

  calculateMacrosAllowance(props);

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
    labels: ["Carbs", "Fats", "Proteins"],
    datasets: [
      {
        data: [props.carbs, props.fats, props.proteins],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 99, 132, 0.25)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: ["rgba(255, 99, 132, 0.5)"],
        borderWidth: 0,
        cutout: "0%",
      },
    ],
  };

  return (
    <div className="macro-main-section">
      <Doughnut data={data} options={options} className="macro-doughnut" />
      <div className="macro-counter-section">
        <div>
          <GiFrenchFries size={"27"} />
          <p className="macro-counter-text">Carbs</p>
          <p className="macro-counter-value">
            {props.carbs}g of {carbAllowance}g
          </p>
        </div>

        <div>
          <GiCupcake size={"27"} />
          <p className="macro-counter-text">Fats</p>
          <p className="macro-counter-value">
            {props.fats}g of {fatAllowance}g
          </p>
        </div>

        <div>
          <GiMeat size={"27"} />
          <p className="macro-counter-text">Proteins</p>
          <p className="macro-counter-value">
            {props.proteins}g of {proteinAllowance}g
          </p>
        </div>
      </div>
    </div>
  );
}

export default MacroDoughnut;
