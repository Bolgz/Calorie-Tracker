import "./Home.css";
import WeightGraph from "../WeightComponents/WeightGraph";
import CalorieChart from "../CalorieComponents/CalorieChart";

/**
 * @returns CalorieChart and the WeightGraph
 */
function Home() {
  return (
    <div>
      <CalorieChart />
      <WeightGraph />
    </div>
  );
}

export default Home;
