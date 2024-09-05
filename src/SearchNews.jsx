import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { api } from "./envVar";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("apple");
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    let queryInput = document.getElementById("searchQuery");
    if (queryInput) {
      let query = queryInput.value;
      console.log(query);
      setSearchQuery(query);
      document.title = `About '${searchQuery.toUpperCase()}' - News Monkey`;
    }

    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-09-04&to=2024-09-04&searchIn=title,description,content&sortBy=popularity&apiKey=${api}`;

    console.log(url);

    try {
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching news: ", error);
      setLoading(false);
    }
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    await updateNews();
  };

  const handlePrevClick = async () => {
    setPage(page - 1);
    await updateNews();
  };

  useEffect(() => {
    console.log("Running useEffect (componentDidMount equivalent)");
    updateNews();
  }, []); // Empty array ensures this effect runs only once (on mount)

  return (
    <div className="container my-3">
      <h2 className="text-center">News Monkey news for you</h2>
      {loading && <Spinner />}
      <div className="row">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageURL={element.urlToImage}
                  newsURL={element.url}
                  author={element.author}
                  source={element.source.name}
                  time={element.publishedAt}
                  date={new Date(element.publishedAt)}
                />
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          onClick={handlePrevClick}
          className="btn btn-primary"
        >
          &lArr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          type="button"
          onClick={handleNextClick}
          className="btn btn-primary"
        >
          Next &rArr;
        </button>
      </div>
    </div>
  );
};

export default News;
