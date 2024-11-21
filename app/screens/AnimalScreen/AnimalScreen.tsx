"use client";

import React from "react";
import "./AnimalScreen.css";

const AnimalScreen = () => {
  return (
    <div className="mainContent">
      <div className="header">
        <h2 className="dashboard-title">Animals Dashboard</h2>
        <button className="create-button">+ Create New</button>
      </div>
      <div className="animal-grid">
        {/* Hardcoded Animal Cards */}
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="animal-card">
              <img
                src="https://www.hudsonanimalhospitalnyc.com/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=HAmFCOvb"
                alt="Lucy"
                className="animal-image"
              />
              <h3>Lucy - Golden Retriever</h3>
              <p>Long Lam · Trained: 100 hours</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AnimalScreen;
