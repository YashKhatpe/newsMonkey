import './App.css';
import NavBar from './Navbar';
import News from './News';
import SearchNews from './SearchNews';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import React, { useState } from 'react';

const App = () => {
  const pageSize = 15;
  
  // State for progress
  const [progress, setProgress] = useState(0);

  // Function to handle progress update
  const handleSetProgress = (progressValue) => {
    setProgress(progressValue + 1);
  };

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route 
            exact path="/us"  
            element={<News setProgress={handleSetProgress} key="us" pageSize={pageSize} country={"us"} category={""} />} 
          />
          <Route 
            exact path="/"  
            element={<News setProgress={handleSetProgress} key="in" pageSize={pageSize} country={"us"} category={""} />} 
          />
          <Route 
            exact path="/sports" 
            element={<News setProgress={handleSetProgress} key="sports" pageSize={pageSize} country={"us"} category={"sports"} />} 
          />
          <Route 
            exact path="/business" 
            element={<News setProgress={handleSetProgress} key="business" pageSize={pageSize} country={"us"} category={"business"} />} 
          />
          <Route 
            exact path="/search" 
            element={<SearchNews setProgress={handleSetProgress} key="search" pageSize={pageSize} />} 
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
