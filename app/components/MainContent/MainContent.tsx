import React from "react";
import TrainingLogScreen from "../../screens/TrainingLogScreen/TrainingLogScreen";
import AnimalScreen from "../../screens/AnimalScreen/AnimalScreen";
import AdminTrainingScreen from "@/app/screens/AdminTrainingScreen/AdminTrainingScreen";
import AdminAnimalScreen from "@/app/screens/AdminAnimalScreen/AdminAnimalScreen";
import AdminUsersScreen from "@/app/screens/AdminUsersScreen/AdminUsersScreen";

export default function MainContent({ selectedTab }: { selectedTab: string }) {
    // switch statement to return the appropriate page based on the selectedTab
    const renderContent = () => {
        switch (selectedTab) {
            case "training-logs":
                return (
                    <TrainingLogScreen />
                );
            case "animals":
                return (
                    <AnimalScreen />
                );
            case "admin-training":
                return (
                    <AdminTrainingScreen />
                );
            case "admin-animals":
                return (
                    <AdminAnimalScreen />
                );
            case "admin-users":
                return (
                    <AdminUsersScreen />
                );
            default:
                return <div>Page not found</div>;
        }
    };

    return (
        <div className="main-content">
            {renderContent()}
        </div>
    );
}