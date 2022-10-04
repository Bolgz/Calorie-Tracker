import "./WeightEntries.css";
import WeightEntryCard from "./WeightEntryCard";
import Table from "react-bootstrap/Table";

/**
 * @param props Props passed down by WeightGraph.js
 * @returns A list of filtered weight entries
 */
function WeightEntries(props) {
  let monthFilter;
  //Choose month filter (number) based upon month filter (word)
  switch (props.monthFilter) {
    case "January":
      monthFilter = "01";
      break;
    case "February":
      monthFilter = "02";
      break;
    case "March":
      monthFilter = "03";
      break;
    case "April":
      monthFilter = "04";
      break;
    case "May":
      monthFilter = "05";
      break;
    case "June":
      monthFilter = "06";
      break;
    case "July":
      monthFilter = "07";
      break;
    case "August":
      monthFilter = "08";
      break;
    case "September":
      monthFilter = "09";
      break;
    case "October":
      monthFilter = "10";
      break;
    case "November":
      monthFilter = "11";
      break;
    case "December":
      monthFilter = "12";
      break;
    default:
      monthFilter = "";
      break;
  }

  //Filter the entries by year
  const filteredEntriesYear = props.entries.filter((entry) => {
    // eslint-disable-next-line
    const [day, month, year] = entry[0].split("-");
    if (year === props.yearFilter) {
      return true;
    } else {
      return false;
    }
  });

  //Filter entries by month (only once they have been filtered by year)
  // eslint-disable-next-line
  const filteredEntriesMonth = filteredEntriesYear.filter((entry) => {
    // eslint-disable-next-line
    const [day, month, year] = entry[0].split("-");
    if (month === monthFilter) {
      return true;
    } else {
      return false;
    }
  });

  /**
   * Sorts entries by month
   * @param a First month entry comparator
   * @param b Second month entry comparator
   */
  function sortByMonth(a, b) {
    //Get month of each weight entry
    // eslint-disable-next-line
    const [aDay, aMonth, aYear] = a[0].split("-");
    // eslint-disable-next-line
    const [bDay, bMonth, bYear] = b[0].split("-");

    if (aMonth === bMonth) {
      return 0;
    } else {
      return aMonth > bMonth ? -1 : 1;
    }
  }

  /**
   * Sorts entries by day
   * @param a First day entry comparator
   * @param b Second day entry comparator
   */
  function sortByDay(a, b) {
    //Get day of each weight entry
    // eslint-disable-next-line
    const [aDay, aMonth, aYear] = a[0].split("-");
    // eslint-disable-next-line
    const [bDay, bMonth, bYear] = b[0].split("-");

    if (aDay === bDay) {
      return 0;
    } else {
      return aDay > bDay ? -1 : 1;
    }
  }

  //If there is not a month filter sort by month
  if (monthFilter.length <= 1) {
    filteredEntriesYear.sort(sortByMonth);
  } else {
    //If there is  a month filter sort by day
    filteredEntriesMonth.sort(sortByDay);
  }

  //If there is no month filter, show all entries filtered by year
  if (monthFilter.length <= 1) {
    return (
      <div className="weight_entries_section">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Entry Date</th>
              <th>Weight</th>
              <th>Target Weight</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntriesYear.map((weightEntry) => (
              <WeightEntryCard
                weightEntry={weightEntry}
                remove={props.remove}
                key={Math.random()}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    //If there is a month filter, show all entries filtered by year and month
    return (
      <div className="weight_entries_section">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Weight</th>
              <th>Weight Date</th>
              <th>Target Weight</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntriesMonth.map((weightEntry) => (
              <WeightEntryCard
                weightEntry={weightEntry}
                remove={props.remove}
                key={Math.random()}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default WeightEntries;
