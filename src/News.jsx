import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import { api } from "./envVar";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Capitalize function
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Update the document title based on category or country
  useEffect(() => {
    document.title = `${props.category ? capitalize(props.category) : capitalize(props.country === 'in' ? 'India' : props.country === 'us' ? 'US' : '')} - News Monkey`;
  }, [props.category, props.country]);

  // Fetch news from the API
  const updateNews = useCallback(async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${api}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    console.log(url);
    try {
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetching news: ", error);
      setLoading(false);
    }
  }, [page, props.country, props.category, props.pageSize]);

  // Fetch news on mount and whenever page, country, or category changes
  useEffect(() => {
    updateNews();
  }, [updateNews]);

  // Handle next page click
  const handleNextClick = async () => {
    setPage(page + 1);
  };

  // Handle previous page click
  const handlePrevClick = async () => {
    setPage(page - 1);
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">News Monkey news for you</h2>
      {loading && <Spinner />}
      <div className="row ">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={(element.description && typeof element.description === 'string') ? element.description.substring(0, 100) : ''}
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
