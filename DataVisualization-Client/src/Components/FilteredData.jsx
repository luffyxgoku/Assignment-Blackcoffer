// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function FilteredData() {
//   // State to manage filter inputs
//   const [filters, setFilters] = useState({
//     startYear: "",
//     endYear: "",
//     topic: "",
//     sector: "",
//     region: "",
//     country: "",
//     city: "",
//     pestle: "",
//     source: "",
//     swot: "",
//   });

//   // State for API response data
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch data based on filters
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/filterData", {
//         params: filters,
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data initially (optional) or based on filter changes
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle input changes for each filter
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   // Trigger search when user presses "Search"
//   const handleSearch = () => {
//     fetchData();
//   };

//   return (
//     <div>
//       <h2>Data Dashboard</h2>

//       {/* Filter Inputs */}
//       <div>
//         <input
//           type="text"
//           name="startYear"
//           placeholder="Start Year"
//           value={filters.startYear}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="endYear"
//           placeholder="End Year"
//           value={filters.endYear}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="topic"
//           placeholder="Topic"
//           value={filters.topic}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="sector"
//           placeholder="Sector"
//           value={filters.sector}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="region"
//           placeholder="Region"
//           value={filters.region}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           value={filters.country}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={filters.city}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="pestle"
//           placeholder="PEST"
//           value={filters.pestle}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="source"
//           placeholder="Source"
//           value={filters.source}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="swot"
//           placeholder="SWOT"
//           value={filters.swot}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {/* Loading Indicator */}
//       {loading && <p>Loading...</p>}

//       {/* Data Table */}
//       {!loading && data.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Year</th>
//               <th>Topic</th>
//               <th>Sector</th>
//               <th>Region</th>
//               <th>Country</th>
//               <th>Pestle</th>
//               <th>Source</th>
//               <th>Swot</th>
//               <th>Title</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.start_year || "N/A"}</td>
//                 <td>{item.topic}</td>
//                 <td>{item.sector}</td>
//                 <td>{item.region}</td>
//                 <td>{item.country}</td>
//                 <td>{item.pestle}</td>
//                 <td>{item.source}</td>
//                 <td>{item.swot}</td>
//                 <td>{item.title}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         !loading && <p>No data available</p>
//       )}
//     </div>
//   );
// }

// export default FilteredData;

import React, { useState, useEffect } from "react";
import axios from "axios";

function FilteredData() {
  // State to manage filter inputs
  const [filters, setFilters] = useState({
    startYear: "",
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    country: "",
    city: "",
    pestle: "",
    source: "",
    swot: "",
  });

  // State for API response data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data based on filters
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/filterData", {
        params: filters,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data initially (optional) or based on filter changes
  useEffect(() => {
    fetchData();
  }, []);

  // Handle input changes for each filter
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Trigger search when user presses "Search"
  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <h2 className="graph-heading unique">Filter Data Dashboard</h2>

      {/* Filter Inputs */}
      <div className="search-input-container">
        <input
          className="search-input"
          type="text"
          name="startYear"
          placeholder="Start Year"
          value={filters.startYear}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="endYear"
          placeholder="End Year"
          value={filters.endYear}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="topic"
          placeholder="Topic"
          value={filters.topic}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="sector"
          placeholder="Sector"
          value={filters.sector}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="region"
          placeholder="Region"
          value={filters.region}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="country"
          placeholder="Country"
          value={filters.country}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="pestle"
          placeholder="PEST"
          value={filters.pestle}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="source"
          placeholder="Source"
          value={filters.source}
          onChange={handleInputChange}
        />
        <input
          className="search-input"
          type="text"
          name="swot"
          placeholder="SWOT"
          value={filters.swot}
          onChange={handleInputChange}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Data Table */}
      {!loading && data.length > 0 ? (
        <table className="main-table">
          <thead className="table-head">
            <tr style={{ border: "2px solid red" }}>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Topic</th>
              <th>Sector</th>
              <th>Region</th>
              <th>Country</th>
              <th>Pestle</th>
              <th>Source</th>
              <th>Swot</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.start_year || "N/A"}</td>
                <td>{item.end_year || "N/A"}</td>
                <td>{item.topic}</td>
                <td>{item.sector}</td>
                <td>{item.region}</td>
                <td>{item.country}</td>
                <td>{item.pestle}</td>
                <td>{item.source}</td>
                <td>{item.swot}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No data available</p>
      )}
    </div>
  );
}

export default FilteredData;
