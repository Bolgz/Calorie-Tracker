import "./Home.css";
import CalorieChart from "../../CalorieComponents/CalorieChart";
import SideBar from "../../Navigation/SideBar";

/**
 * @returns CalorieChart and the WeightGraph
 */
function Home() {
  return (
    <div className="home-flex-box">
      <SideBar />
      <CalorieChart />
    </div>
  );
}

export default Home;
