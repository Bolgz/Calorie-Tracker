import "./MacroDoughnut.css";
import { Doughnut } from "react-chartjs-2";
import { GiFrenchFries } from "react-icons/gi";
import { GiCupcake } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";

/**
 * @param props Props passed down from the CalorieChart.js component
 * @return The 'macro' doughnut along with the carbs, fats and proteins icons and values
 */
function MacroDoughnut(props) {
  //Total grams of each macro allowed per day
  let carbAllowance;
  let proteinAllowance;
  let fatAllowance;

  //Total grams of each macro consumed on selected day
  let totalCarbs = 0;
  let totalFats = 0;
  let totalProteins = 0;

  /**
   * Filter entries by selected date & then add up amount of each macro consumed
   */
  function filterAndFindTotalMacros() {
    const filteredEntries = props.entries.filter(
      (entry) => entry._selectedDate === props.selectedDate
    );
    filteredEntries.forEach((entry) => {
      totalCarbs += parseInt(entry._carbsAmount);
      totalFats += parseInt(entry._fatAmount);
      totalProteins += parseInt(entry._proteinAmount);
    });
  }

  filterAndFindTotalMacros();

  /**
   * Calculated macro allowances based upon daily calorie goal
   */
  function calculateMacrosAllowance() {
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

  //Macro doughnut data if there is macro data
  let data = {
    labels: ["Carbs", "Fats", "Proteins"],
    datasets: [
      {
        data: [totalCarbs, totalFats, totalProteins],
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

  //Macro doughnut data if there is no macro data
  if (totalCarbs === 0 && totalFats === 0 && totalProteins === 0) {
    data = {
      labels: ["No Data"],
      datasets: [
        {
          data: [1],
          backgroundColor: ["rgba(255, 99, 132, 0.4)"],
          borderColor: ["rgba(255, 99, 132, 0.5)"],
          borderWidth: 0,
          cutout: "70%",
        },
      ],
    };
  }

  return (
    <div className="macro-main-section">
      <Doughnut data={data} options={options} className="macro-doughnut" />
      <div className="macro-counter-section">
        <div>
          <GiFrenchFries size={"27"} />
          <p className="macro-counter-text">Carbs</p>
          <p className="macro-counter-value">
            {totalCarbs}g of {carbAllowance}g
          </p>
        </div>

        <div>
          <GiCupcake size={"27"} />
          <p className="macro-counter-text">Fats</p>
          <p className="macro-counter-value">
            {totalFats}g of {fatAllowance}g
          </p>
        </div>

        <div>
          <GiMeat size={"27"} />
          <p className="macro-counter-text">Proteins</p>
          <p className="macro-counter-value">
            {totalProteins}g of {proteinAllowance}g
          </p>
        </div>
      </div>
    </div>
  );
}

export default MacroDoughnut;
