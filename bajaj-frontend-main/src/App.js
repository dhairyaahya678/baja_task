import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const API_URL = "https://bajsj-backend-1.onrender.com/bfhl";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async () => {
    setError("");
    try {
      const parsedData = JSON.parse(jsonInput);
      const result = await axios.post(API_URL, parsedData);
      setResponse(result.data);
    } catch (e) {
      setError("Invalid JSON input");
    }
  };

  const filterResponse = () => {
    if (!response) return null;

    const filteredData = {};
    if (selectedOptions.some((opt) => opt.value === "alphabets")) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedOptions.some((opt) => opt.value === "numbers")) {
      filteredData.numbers = response.numbers;
    }
    if (
      selectedOptions.some((opt) => opt.value === "highest_lowercase_alphabet")
    ) {
      filteredData.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet;
    }

    return filteredData;
  };

  return (
    <div className="App">
      <h1>21BCE11642 </h1> {/* Replace with your roll number */}
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON data here (e.g., { "data": ["A", "C", "z"] })'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      <Select
        isMulti
        options={options}
        onChange={setSelectedOptions}
        className="select"
      />
      {response && (
        <div>
          <h2>Filtered Response</h2>
          <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
