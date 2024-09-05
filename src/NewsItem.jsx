import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "./no_img.png";
import PropTypes from "prop-types";
import "./App.css";

const NewsItem = ({
  title,
  description,
  imageURL,
  newsURL,
  author,
  time,
  source,
}) => {
  return (
    <div className="my-3">
      <button type="button" className="btn position-relative">
        <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger span-class">
          {source}
        </span>

        <div
          className="card my-4"
          style={{
            height: "600px",
          }}
        >
          <img
            src={!imageURL ? defaultImg : imageURL}
            className="card-img-top"
            alt="news"
            style={{
              height: "300px",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <div className="card-text text-center">
              <small className="text-muted">
                By: {author ? author : "Unknown Person"}
                At: {new Date(time).toGMTString()}
              </small>
            </div>
          </div>
          <div style={{ width: "100%", marginBottom: "20px" }}>
            <Link
              to={newsURL}
              target="_blank"
              className="btn btn-primary btn-sm"
              style={{ width: "100%" }}
            >
              Read More
            </Link>
          </div>
        </div>
      </button>
    </div>
  );
};

// PropTypes for type checking
NewsItem.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageURL: PropTypes.string,
  newsURL: PropTypes.string,
  time: PropTypes.string,
  source: PropTypes.string,
};

// Default props in case certain props are missing
NewsItem.defaultProps = {
  author: "Unknown",
};

export default NewsItem;
