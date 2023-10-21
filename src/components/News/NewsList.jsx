import React, { useState } from "react";

import axios from "axios";

function NewsList() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const getArticles = async () => {
    try {
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}&q=${input}`
        
        
        
      );
      console.log(response);

      setResults(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getArticles(); // Send the API request when the form is submitted
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search news"
        />
        <button type="submit">Search</button>
      </form>
      {results.map((result, index) => (
        <div key={index}>
          <h1>{result.content}</h1>
          <h3>{result.language}</h3>

          <strong>{result.description}</strong>
          <p>{result.title}</p>
          <img src={result.image_url} alt="news" />
        </div>
      ))}
    </div>
  );
}

export default NewsList;
