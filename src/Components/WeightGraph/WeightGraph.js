import "./WeightGraph.css";
import WeightEntryForm from "./WeightEntryForm";
import WeightEntry from "./WeightEntry";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeightGraph() {
  //State that stores each weight for a given month
  const [weightObject, setWeightObject] = useState({
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  });

  //State that stores the average weight for each month [list 0 -> 11]
  const [weightAverages, setWeightAverages] = useState([]);

  //List of lists that stores each weight entry in full [[date, weight], [date, weight]]. Passed into WeightEntry.js as prop
  const [allEntries, setAllEntries] = useState([]);

  //Graph options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  //Graph labels (X Axis)
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Passed as prop to WeightEntry.js - retrieves weight entry data
  function handleWeightEntry(date, weight) {
    setAllEntries((prevState) => [...prevState, [date, weight]]);
    const month = date[5] + date[6];
    let copyObject = weightObject;
    switch (month) {
      case "01":
        copyObject.January.push(weight);
        setWeightObject(copyObject);
        break;
      case "02":
        copyObject.February.push(weight);
        setWeightObject(copyObject);
        break;
      case "03":
        copyObject.March.push(weight);
        setWeightObject(copyObject);
        break;
      case "04":
        copyObject.April.push(weight);
        setWeightObject(copyObject);
        break;
      case "05":
        copyObject.May.push(weight);
        setWeightObject(copyObject);
        break;
      case "06":
        copyObject.June.push(weight);
        setWeightObject(copyObject);
        break;
      case "07":
        copyObject.July.push(weight);
        setWeightObject(copyObject);
        break;
      case "08":
        copyObject.August.push(weight);
        setWeightObject(copyObject);
        break;
      case "09":
        copyObject.September.push(weight);
        setWeightObject(copyObject);
        break;
      case "10":
        copyObject.October.push(weight);
        setWeightObject(copyObject);
        break;
      case "11":
        copyObject.November.push(weight);
        setWeightObject(copyObject);
        break;
      case "12":
        copyObject.December.push(weight);
        setWeightObject(copyObject);
        break;
      default:
        break;
    }
    calculateWeightAverages();
  }

  //Calculates weight average for each month and set's the weightAverage state
  function calculateWeightAverages() {
    let weights = [];
    for (let index = 0; index < 12; index++) {
      let total = 0;
      weightObject[Object.keys(weightObject)[index]].forEach((weight) => {
        total += parseFloat(weight);
      });
      total = total / weightObject[Object.keys(weightObject)[index]].length;
      weights[index] = total;
    }
    setWeightAverages(weights);
  }

  //Passed into <Line/> to draw the graph
  const graphData = {
    labels,
    datasets: [
      {
        label: "Average Weight (Kg)",
        data: labels.map((element, index) => weightAverages[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={graphData} className="graph" />
      <div className="weight-entry-section">
        <WeightEntryForm addWeightEntry={handleWeightEntry} />
        <WeightEntry entries={allEntries} />
      </div>
    </div>
  );
}

export default WeightGraph;
