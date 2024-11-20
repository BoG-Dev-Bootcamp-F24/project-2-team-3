import React from "react";
import "./SideBar.css";

export default function SideBar({ selectedTab, setSelectedTab }: { selectedTab: string, setSelectedTab: (tab: string) => void }) {
    return (
        <div className="sidebar">
            {/* Sidebar content can be added here in the future */}
        </div>
    );
}