import React, { useEffect, useState } from "react";
import axios from "axios";
 

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
      const [place, setPlace] = useState("world");

  const handlePlaceChange = (newPlace) => {
    setPlace(newPlace);
  };

  

  const URL = `https://newsapi.org/v2/everything?q=${place}&sortBy=publishedAt&apiKey=223a3ebe0fda445b9ff96cd814883f1c`;

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setArticles(res.data.articles);
        // console.log(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to fetch articles" + (err.response ? `: ${err.response.data.message}` : ""));
        setLoading(false);
      });
  });

  return (
    <div className="home" id="home">
      <h1>Welcome to the News Aggregator</h1>
       <div className="place-selector">
        <button onClick={() => handlePlaceChange("world")}>World</button>
        <button onClick={() => handlePlaceChange("india")}>India</button>
        <button onClick={() => handlePlaceChange("technology")}>Technology</button>
        <button onClick={() => handlePlaceChange("health")}>Health</button>
        <button onClick={() => handlePlaceChange("science")}>Science</button>
        <button onClick={() => handlePlaceChange("politics")}>Politics</button>
        <button onClick={() => handlePlaceChange("finance")}>Finance</button>
        <button onClick={() => handlePlaceChange("sports")}>Sports</button>
        <button onClick={() => handlePlaceChange("business")}>Business</button>
        <button onClick={() => handlePlaceChange("entertainment")}>Entertainment</button>
      </div>
      <p className="error-message">{error}</p>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="news-list">
          {articles.map((article, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                <img src={article.urlToImage} alt={article.title} />
              </div>
              
              <div className="card-content">
                <div className="card-meta">
                  <span className="source">{article.source.name}</span>
                  <span className="date">
                    {new Date(article.publishedAt).toLocaleString()}
                  </span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="card-footer">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                  <div className="author">
                    Author : {article.author || "Unknown Author"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
