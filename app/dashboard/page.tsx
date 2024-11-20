"use client";

import React from "react";
import TitleBar from "../components/TitleBar/TitleBar";
import "./Dashboard.css";
import SideBar from "../components/SideBar/SideBar";
import MainContent from "../components/MainContent/MainContent";
import { useState } from "react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("training-logs");

  return (
    <div className="dashboard-container">
      <TitleBar />
      <div className="dashboard-content">
        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <MainContent selectedTab={selectedTab} />
      </div>
    </div>
  );
}
