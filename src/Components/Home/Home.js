import "./Home.css";
import WeightGraph from "../WeightComponents/WeightGraph";
import CalorieChart from "../CalorieComponents/CalorieChart";

function Home() {
  return (
    <div>
      <CalorieChart />
      <WeightGraph />
    </div>
  );
}

export default Home;
