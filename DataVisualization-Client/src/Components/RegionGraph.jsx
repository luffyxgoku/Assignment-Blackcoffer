import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const RegionGraph = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef();

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/topics-by-region") // Adjust this endpoint if necessary
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Render chart with D3
  useEffect(() => {
    if (data.length === 0) return;

    // Set chart dimensions
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Select the chart container
    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous contents
    svg.selectAll("*").remove();

    // Prepare data
    const regions = data.map((d) => d._id);
    const topicCounts = data.map((d) => d.topics.length);

    // Set up scales
    const x = d3
      .scaleBand()
      .domain(regions)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(topicCounts)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    // Add Y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d._id))
      .attr("y", (d) => y(d.topics.length))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.topics.length))
      .attr("fill", "steelblue");

    // Add labels to bars
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d._id) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.topics.length) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.topics.length);
  }, [data]);

  return (
    <div className="bar-component-container">
      <h3 className="graph-heading">Topics by Region</h3>
      <div className="bar-graph-container">
        <svg className="bar-graph" ref={chartRef}></svg>
      </div>
    </div>
  );
};

export default RegionGraph;
