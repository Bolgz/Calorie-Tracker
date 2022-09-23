import "./WeightEntries.css";
import WeightEntryCard from "./WeightEntryCard";

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
    const [day, month, year] = entry[0].split("-");
    if (year === props.yearFilter) {
      return true;
    } else {
      return false;
    }
  });

  //Filter entries by month (only once they have been filtered by year)
  const filteredEntriesMonth = filteredEntriesYear.filter((entry) => {
    const [day, month, year] = entry[0].split("-");
    if (month === monthFilter) {
      return true;
    } else {
      return false;
    }
  });

  //If there is no month filter, show all entries filtered by year
  if (monthFilter.length <= 1) {
    return (
      <div className="weight_entries_section">
        <h4 className="weight-entries-title">
          All Weight Entries - {props.yearFilter}
        </h4>
        <div className="weight_entry_scroll_box">
          {filteredEntriesYear.map((weightEntry) => (
            <WeightEntryCard
              weightEntry={weightEntry}
              remove={props.remove}
              key={Math.random()}
            />
          ))}
        </div>
      </div>
    );
  } else {
    //If there is a month filter, show all entries filtered by year and month
    return (
      <div className="weight_entries_section">
        <h4 className="weight-entries-title">
          Weight Entries - {props.monthFilter} {props.yearFilter}
        </h4>
        <div className="weight_entry_scroll_box">
          {filteredEntriesMonth.map((weightEntry) => (
            <WeightEntryCard
              weightEntry={weightEntry}
              remove={props.remove}
              key={Math.random()}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WeightEntries;
