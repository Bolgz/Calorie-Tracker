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
import * as graphUtilities from "../../Utilities/GraphUtilities";
import { getAuth } from "firebase/auth";
import DateFilter from "../Filters/DateFilter";

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

  //State that stores the average weight for each day/month (depending on chosen filter)
  const [weightAverages, setWeightAverages] = useState([]);
  //List of lists that stores each weight entry in full [[date, weight], [date, weight]]. Passed into WeightEntry.js as prop
  const [allEntries, setAllEntries] = useState([]);
  //State that holds month filter
  const [monthFilter, setMonthFilter] = useState("");
  //State that holds year filter
  const [yearFilter, setYearFilter] = useState("");

  //Using useEffect to stop infinite loop
  //Retrieving weight entries from firestore
  useEffect(() => {
    const auth = getAuth();
    utilities
      .getWeightEntryList(auth.currentUser.uid)
      .then((entries) => populateWeightEntryObject(entries));
    // eslint-disable-next-line
  }, []);

  function populate(entry) {
    //Adds each entry to the allEntries state
    setAllEntries((prevState) => [...prevState, [entry.date, entry.weight]]);
    //Returns an object with each month as a key and a list of weights for that month as the value
    const newWeightObject = graphUtilities.populate(entry, weightObject);

    //Sets the weightObject state to the newly created object
    setWeightObject(newWeightObject);
    //If there is no month filter, calculate average monthly weight
    if (monthFilter === "") {
      calculateWeightAveragesYear();
      //If there is a month filter, calculate weight average for each day of month
    } else {
      calculateWeightAveragesMonth();
    }
  }

  //This is called on page refresh/first load. Populates weight entry object with entries in firestore
  function populateWeightEntryObject(entries) {
    //For each entry grabbed from firestore call populate
    entries.forEach((entry) => populate(entry));
  }

  //Passed as prop to WeightEntry.js - retrieves weight entry data
  function handleWeightEntry(_weight, _date) {
    const entry = { weight: _weight, date: _date };
    populate(entry);
  }

  function removeWeightEntry(date, weight) {
    //Removes entry from all weight entries list
    let copyEntries = allEntries.filter(
      (entry) => !(entry[0] === date && entry[1] === weight)
    );
    setAllEntries(copyEntries);

    //Removes entry from firestore
    const auth = getAuth();
    utilities.removeWeightEntry(date, weight, auth.currentUser.uid);

    //Removes entry from weight object (so that graph can be updated)
    //Returns an object with each month as a key and a list of weights for that month as the value
    const newWeightObject = graphUtilities.removeWeightEntry(
      weight,
      date,
      weightObject
    );

    //Sets the weightObject state to the newly created object
    setWeightObject(newWeightObject);
    //If there is no month filter, calculate average monthly weight
    if (monthFilter === "") {
      calculateWeightAveragesYear();
      //If there is a month filter, calculate weight average for each day of month
    } else {
      calculateWeightAveragesMonth();
    }
  }

  //Calculates weight average for each month and set's the weightAverage state
  function calculateWeightAveragesYear() {
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

  //Calculates weight average for each day of the month and set's the weightAverage state
  function calculateWeightAveragesMonth() {
    if (monthFilter.length <= 0) return;
    let weights = [];
    //Sort weights by date
    weightObject[monthFilter].sort(sortByDate);
    function sortByDate(a, b) {
      if (a[1] === b[1]) {
        return 0;
      } else {
        return a[1] < b[1] ? -1 : 1;
      }
    }

    for (let index = 0; index < weightObject[monthFilter].length; index++) {
      //Get the day of each weight entry (02 becomes 2 etc)
      let day =
        weightObject[monthFilter][index][1][0] +
        weightObject[monthFilter][index][1][1];
      weights[parseInt(day) - 1] = weightObject[monthFilter][index][0];
    }
    setWeightAverages(weights);
  }

  //Called whenever monthFilter state changes (callback)
  useEffect(() => {
    if (monthFilter.length > 0) {
      calculateWeightAveragesMonth();
    } else {
      calculateWeightAveragesYear();
    }
    // eslint-disable-next-line
  }, [monthFilter]);

  //Called whenever monthFilter state changes (callback)
  useEffect(() => {
    if (yearFilter.length > 0) {
      calculateWeightAveragesMonth();
    } else {
      calculateWeightAveragesYear();
    }
    // eslint-disable-next-line
  }, [yearFilter]);

  //Changes month filter
  function handleChangeMonthFilter(month) {
    setMonthFilter(month);
  }

  function handleChangeYearFilter(year) {
    setYearFilter(year);
  }

  //Graph labels (X Axis)
  let monthLabels = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  let yearLabels = [
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

  let labels = monthFilter === "" ? yearLabels : monthLabels;

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
      <DateFilter
        changeMonthFilter={handleChangeMonthFilter}
        changeYearFilter={handleChangeYearFilter}
      />
      <Line options={options} data={graphData} className="graph" />
      <div className="weight-entry-section">
        <WeightEntryForm addWeightEntry={handleWeightEntry} />
        <WeightEntry entries={allEntries} remove={removeWeightEntry} />
      </div>
    </div>
  );
}

export default WeightGraph;
