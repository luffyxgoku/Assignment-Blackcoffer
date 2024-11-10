// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ResponsiveHeatMap } from "@nivo/heatmap";

// const IntensityHeatmap = () => {
//   const [heatmapData, setHeatmapData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetching data from the backend
//         const response = await axios.get(
//           "http://localhost:5000/api/intensity-by-country"
//         );
//         const data = response.data;

//         // Check if the data is in the expected format
//         if (Array.isArray(data) && data.length > 0) {
//           // Transform the backend data into a format that Nivo expects
//           const formattedData = data.map((item) => ({
//             country: item._id, // Country name (id)
//             intensity: item.avgIntensity, // Average intensity
//           }));

//           // Now set the state with the transformed data
//           setHeatmapData(formattedData);
//         }
//       } catch (error) {
//         console.error("Error fetching intensity data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (heatmapData.length === 0) {
//     return <div>Loading data...</div>;
//   }

//   // Prepare data for Nivo's heatmap format
//   const heatmapFormattedData = [
//     {
//       id: "Intensity",
//       data: heatmapData.map((item) => ({
//         x: item.country, // Country name as x-axis
//         y: item.intensity, // Intensity as y-axis value
//       })),
//     },
//   ];

//   return (
//     <div style={{ height: 500 }}>
//       <h2>Intensity Heatmap</h2>
//       <ResponsiveHeatMap
//         data={heatmapFormattedData} // Pass the formatted data
//         keys={["Intensity"]} // Only one key, intensity
//         indexBy="x" // x-axis: countries
//         margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
//         colors={{
//           type: "sequential",
//           range: ["#f7fbff", "#08306b"], // Color range (light to dark)
//         }}
//         axisTop={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: -45,
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//         }}
//         cellOpacity={1}
//         cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
//         labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
//         animate={true}
//         motionStiffness={80}
//         motionDamping={9}
//         isInteractive={true}
//         hoverTarget="cell"
//       />
//     </div>
//   );
// };

// export default IntensityHeatmap;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const IntensityHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data from the backend
        const response = await axios.get(
          "http://localhost:5000/api/intensity-by-country"
        );
        const data = response.data;

        // Check if the data is in the expected format
        if (Array.isArray(data) && data.length > 0) {
          // Transform the backend data into a format that Nivo expects
          const formattedData = data.map((item) => ({
            country: item._id, // Country name (id)
            intensity: parseFloat(item.avgIntensity).toFixed(1), // Round to 1 decimal place
          }));

          // Now set the state with the transformed data
          setHeatmapData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching intensity data:", error);
      }
    };

    fetchData();
  }, []);

  if (heatmapData.length === 0) {
    return <div>Loading data...</div>;
  }

  // Prepare data for Nivo's heatmap format
  const heatmapFormattedData = [
    {
      id: "Intensity",
      data: heatmapData.map((item) => ({
        x: item.country, // Country name as x-axis
        y: item.intensity, // Intensity as y-axis value
      })),
    },
  ];

  return (
    <div style={{ height: 500 }}>
      <ResponsiveHeatMap
        data={heatmapFormattedData} // Pass the formatted data
        keys={["Intensity"]} // Only one key, intensity
        indexBy="x" // x-axis: countries
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        colors={{
          type: "sequential",
          range: ["#f7fbff", "#08306b"], // Color range (light to dark)
        }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        cellOpacity={1}
        cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
        animate={true}
        motionStiffness={80}
        motionDamping={9}
        isInteractive={true}
        hoverTarget="cell"
      />
    </div>
  );
};

export default IntensityHeatmap;
