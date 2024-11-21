"use client";

import React from "react";
import Link from "next/link";
import "./SideBar.css";

interface SideBarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function SideBar({ selectedTab, setSelectedTab }: SideBarProps) {
  // Hardcoded values for now
  const isAdmin = true; // Set to `true` or `false` for testing
  const userName = "hello"; // Replace with a sample name

  /*
  Uncomment the following code to implement the API call in the future:
  
  useEffect(() => {
    fetch("/api/verify-user")
      .then((response) => response.json())
      .then((data) => {
        setIsAdmin(data.isAdmin); // Assume the API returns a boolean for admin status
        setUserName(data.name); // Assume the API returns the user's name
      });
  }, []);
  */

  return (
    <div className="sidebar">
      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <div
          className={`sidebar-item ${selectedTab === "training-logs" ? "active" : ""}`}
          onClick={() => setSelectedTab("training-logs")}
        >
          <span>📕</span>
          <span>Training Logs</span>
        </div>
        <div
          className={`sidebar-item ${selectedTab === "animals" ? "active" : ""}`}
          onClick={() => setSelectedTab("animals")}
        >
          <span>🐾</span>
          <span>Animals</span>
        </div>

        {/* Admin Access Section - Conditional Rendering */}
        {isAdmin && (
          <div className="sidebar-admin-section">
            <p>Admin Access</p>
            <div
              className={`sidebar-item ${selectedTab === "all-training" ? "active" : ""}`}
              onClick={() => setSelectedTab("all-training")}
            >
              <span>📂</span>
              <Link href="/dashboard/all-training">All Training</Link>
            </div>
            <div
              className={`sidebar-item ${selectedTab === "all-animals" ? "active" : ""}`}
              onClick={() => setSelectedTab("all-animals")}
            >
              <span>🐾</span>
              <Link href="/dashboard/all-animals">All Animals</Link>
            </div>
            <div
              className={`sidebar-item ${selectedTab === "all-users" ? "active" : ""}`}
              onClick={() => setSelectedTab("all-users")}
            >
              <span>👥</span>
              <Link href="/dashboard/all-users">All Users</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Footer Section */}
      <footer className="sidebar-footer">
        <div className="sidebar-user">
          <span className="sidebar-user-avatar">{userName.charAt(0)}</span>
          <div className="sidebar-user-info">
            <p>{userName}</p>
            <p className="sidebar-user-role">{isAdmin ? "Admin" : "User"}</p>
          </div>
        </div>
        <Link href="/login" className="sidebar-logout">
          <span className="sidebar-logout-icon">➡️</span>
        </Link>
      </footer>
    </div>
  );
}
