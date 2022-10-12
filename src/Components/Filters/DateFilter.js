import "./DateFilter.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

/**
 * @param props Props passed down by WeightGraph.js
 * @returns Graph and weight entry filters
 */
function DateFilter(props) {
  //State that holds month filter
  const [monthFilter, setMonthFilter] = useState("");

  //State that holds year filter
  const [yearFilter, setYearFilter] = useState("2022");

  /**
   * @param eventKey The month filter to switch to
   */
  function changeMonthFilter(eventKey) {
    setMonthFilter(eventKey);
    props.changeMonthFilter(eventKey);
  }

  /**
   * @param eventKey The year filter to switch to
   */
  function changeYearFilter(eventKey) {
    setYearFilter(eventKey);
    props.changeYearFilter(eventKey);
  }

  /**
   * Resets year and month filters
   */
  function resetFilters() {
    setMonthFilter("");
    setYearFilter("2022");
    props.changeMonthFilter("");
    props.changeYearFilter("2022");
  }

  return (
    <div className="filter_container">
      <Dropdown onSelect={changeMonthFilter} className="month_dropdown_list">
        <Dropdown.Toggle id="dropdown-basic">
          {monthFilter.length > 0 ? monthFilter : "Month"}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="outline-primary">
          <Dropdown.Item eventKey={"January"}>January</Dropdown.Item>
          <Dropdown.Item eventKey={"February"}>February</Dropdown.Item>
          <Dropdown.Item eventKey={"March"}>March</Dropdown.Item>
          <Dropdown.Item eventKey={"April"}>April</Dropdown.Item>
          <Dropdown.Item eventKey={"May"}>May</Dropdown.Item>
          <Dropdown.Item eventKey={"June"}>June</Dropdown.Item>
          <Dropdown.Item eventKey={"July"}>July</Dropdown.Item>
          <Dropdown.Item eventKey={"August"}>August</Dropdown.Item>
          <Dropdown.Item eventKey={"September"}>September</Dropdown.Item>
          <Dropdown.Item eventKey={"October"}>October</Dropdown.Item>
          <Dropdown.Item eventKey={"November"}>November</Dropdown.Item>
          <Dropdown.Item eventKey={"December"}>December</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={changeYearFilter} className="year_dropdown_list">
        <Dropdown.Toggle id="dropdown-basic">
          {yearFilter.length > 0 ? yearFilter : "Year"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey={"2022"}>2022</Dropdown.Item>
          <Dropdown.Item eventKey={"2021"}>2021</Dropdown.Item>
          <Dropdown.Item eventKey={"2020"}>2020</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button
        variant="warning"
        className="reset_filters_button"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
}

export default DateFilter;
