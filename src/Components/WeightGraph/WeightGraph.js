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
import React, { useState, useEffect } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

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

  //Using useEffect to stop infinite loop
  //Retrieving weight entries from firestore
  useEffect(() => {
    const auth = getAuth();
    utilities
      .getWeightEntryList(auth.currentUser.uid)
      .then((entries) => populateWeightEntryObject(entries));
    // eslint-disable-next-line
  }, []);

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

  //This is called on page refresh/first load. Populates weight entry object with entries in firestore
  function populateWeightEntryObject(entries) {
    entries.forEach((entry) => populate(entry));

    function populate(entry) {
      setAllEntries((prevState) => [...prevState, [entry.date, entry.weight]]);
      const month = entry.date[5] + entry.date[6];
      let copyObject = weightObject;
      switch (month) {
        case "01":
          copyObject.January.push(entry.weight);
          break;
        case "02":
          copyObject.February.push(entry.weight);
          break;
        case "03":
          copyObject.March.push(entry.weight);
          break;
        case "04":
          copyObject.April.push(entry.weight);
          break;
        case "05":
          copyObject.May.push(entry.weight);
          break;
        case "06":
          copyObject.June.push(entry.weight);
          break;
        case "07":
          copyObject.July.push(entry.weight);
          break;
        case "08":
          copyObject.August.push(entry.weight);
          break;
        case "09":
          copyObject.September.push(entry.weight);
          break;
        case "10":
          copyObject.October.push(entry.weight);
          break;
        case "11":
          copyObject.November.push(entry.weight);
          break;
        case "12":
          copyObject.December.push(entry.weight);
          break;
        default:
          break;
      }
      setWeightObject(copyObject);
      calculateWeightAverages();
    }
  }

  //Passed as prop to WeightEntry.js - retrieves weight entry data
  function handleWeightEntry(date, weight) {
    setAllEntries((prevState) => [...prevState, [date, weight]]);
    const month = date[5] + date[6];
    let copyObject = weightObject;
    switch (month) {
      case "01":
        copyObject.January.push(weight);
        break;
      case "02":
        copyObject.February.push(weight);
        break;
      case "03":
        copyObject.March.push(weight);
        break;
      case "04":
        copyObject.April.push(weight);
        break;
      case "05":
        copyObject.May.push(weight);
        break;
      case "06":
        copyObject.June.push(weight);
        break;
      case "07":
        copyObject.July.push(weight);
        break;
      case "08":
        copyObject.August.push(weight);
        break;
      case "09":
        copyObject.September.push(weight);
        break;
      case "10":
        copyObject.October.push(weight);
        break;
      case "11":
        copyObject.November.push(weight);
        break;
      case "12":
        copyObject.December.push(weight);
        break;
      default:
        break;
    }
    setWeightObject(copyObject);
    calculateWeightAverages();
  }

  function removeWeightEntry(date, weight) {
    //Removes entry from all weight entries list
    let copyEntries = allEntries.filter(
      (entry) => entry[0] !== date && entry[1] !== weight
    );
    setAllEntries(copyEntries);

    //Removes entry from firestore
    const auth = getAuth();
    utilities.removeWeightEntry(date, weight, auth.currentUser.uid);

    //Removes entry from weight object (so that graph can be updated)
    const month = date[5] + date[6];
    let copyObject = weightObject;
    let index = 0;
    switch (month) {
      case "01":
        index = copyObject.January.indexOf(weight);
        if (index !== -1) {
          copyObject.January.splice(index, 1);
        }
        break;
      case "02":
        index = copyObject.February.indexOf(weight);
        if (index !== -1) {
          copyObject.February.splice(index, 1);
        }
        break;
      case "03":
        index = copyObject.March.indexOf(weight);
        if (index !== -1) {
          copyObject.March.splice(index, 1);
        }
        break;
      case "04":
        index = copyObject.April.indexOf(weight);
        if (index !== -1) {
          copyObject.April.splice(index, 1);
        }
        break;
      case "05":
        index = copyObject.May.indexOf(weight);
        if (index !== -1) {
          copyObject.May.splice(index, 1);
        }
        break;
      case "06":
        index = copyObject.June.indexOf(weight);
        if (index !== -1) {
          copyObject.JaJunenuary.splice(index, 1);
        }
        break;
      case "07":
        index = copyObject.July.indexOf(weight);
        if (index !== -1) {
          copyObject.July.splice(index, 1);
        }
        break;
      case "08":
        index = copyObject.August.indexOf(weight);
        if (index !== -1) {
          copyObject.August.splice(index, 1);
        }
        break;
      case "09":
        console.log(copyObject.September);
        index = copyObject.September.indexOf(weight);
        if (index !== -1) {
          copyObject.September.splice(index, 1);
        }
        console.log(copyObject.September);
        break;
      case "10":
        index = copyObject.October.indexOf(weight);
        if (index !== -1) {
          copyObject.October.splice(index, 1);
        }
        break;
      case "11":
        index = copyObject.November.indexOf(weight);
        if (index !== -1) {
          copyObject.November.splice(index, 1);
        }
        break;
      case "12":
        index = copyObject.December.indexOf(weight);
        if (index !== -1) {
          copyObject.December.splice(index, 1);
        }
        break;
      default:
        break;
    }
    setWeightObject(copyObject);
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
        <WeightEntry entries={allEntries} remove={removeWeightEntry} />
      </div>
    </div>
  );
}

export default WeightGraph;
