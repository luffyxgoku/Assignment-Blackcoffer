import React, { useState, useEffect } from "react";
import axios from "axios";
import * as d3 from "d3";

const RelevanceOverTime = () => {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState(2010); // Default start year
  const [endYear, setEndYear] = useState(2018); // Default end year

  useEffect(() => {
    // Fetch data when the component is mounted or when years change
    fetchData(startYear, endYear);
  }, [startYear, endYear]);

  const fetchData = async (start, end) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/relevance-over-time?startYear=${start}&endYear=${end}`
      );
      //   console.log(response.data);
      setData(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    fetchData(startYear, endYear); // Fetch data when the user submits new years
  };

  useEffect(() => {
    if (data.length) {
      drawChart(data); // Draw the chart when the data changes
    }
  }, [data]);

  const drawChart = (data) => {
    const svg = d3.select("#chart").attr("width", 500).attr("height", 300);

    // Clear previous chart content
    svg.selectAll("*").remove();

    // Set margin and chart size
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Create chart container
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set x and y scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.year))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.avgRelevance)])
      .range([height, 0]);

    // Add x and y axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append("g").call(d3.axisLeft(y));

    // Line generator
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.avgRelevance));

    // Add the line to the chart
    g.append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  return (
    <div className="line-chart-container">
      <div className="inputs-container">
        <input
          className="input"
          type="number"
          placeholder="Start Year"
          value={startYear}
          onChange={(e) => setStartYear(parseInt(e.target.value))}
        />
        <input
          className="input"
          type="number"
          placeholder="End Year"
          value={endYear}
          onChange={(e) => setEndYear(parseInt(e.target.value))}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="line-chart-graph-container">
        <svg
          className="line-chart-graph"
          id="chart"
          width="500"
          height="300"
        ></svg>
      </div>
    </div>
  );
};

export default RelevanceOverTime;
