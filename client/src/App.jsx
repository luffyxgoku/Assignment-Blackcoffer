import React from "react";
import RegionGraph from "./Components/RegionGraph.jsx"; // Adjust the path if needed
import IntensityHeatmap from "./Components/IntensityHeatmap.jsx";
import RelevanceOverTime from "./Components/RelevanceOverTime.jsx"; // Import the new component
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import FilteredData from "./Components/FilteredData.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <div className="region-graph-flex">
          <div className="card-description-container">
            <h1 className="heading-graph">Region Graph</h1>
            <p className="description-graph">
              The Topics by Region graph provides a visual analysis of how
              specific topics are distributed across different regions. This
              interactive chart enables users to compare topic relevance or
              intensity in various geographic areas, highlighting regional
              trends and insights. This tool is ideal for understanding regional
              variations in interest, engagement, or importance, offering a
              clear, data-driven view that can support strategic decisions and
              localized initiatives.
            </p>
          </div>
          <RegionGraph />
        </div>

        <div className="relevance-graph-flex">
          <div className="relavence-description-container">
            <h1 className="heading-graph">Relevance Over Time Chart</h1>
            <p className="description-graph">
              The Relevance Over Time graph visualizes changes in topic
              relevance across selected years. By displaying average relevance
              scores over time, this chart reveals trends, patterns, and shifts
              in topic significance. It's a powerful tool for analyzing how
              interest or impact evolves, helping users understand historical
              patterns and make projections based on past data.
            </p>
          </div>
          <RelevanceOverTime />
        </div>
        <div className="intensity-graph-flex">
          <h1 className="heading-graph">Intensity by country Heatmap</h1>
          <IntensityHeatmap />
        </div>
        <FilteredData />
      </div>
    </>
  );
}

export default App;
