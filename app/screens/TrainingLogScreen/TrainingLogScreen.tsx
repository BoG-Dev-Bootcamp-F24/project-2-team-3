import React, { useEffect, useState } from "react";
import styles from "./TrainingLogScreen.module.css";
import TrainingLogCard from "../../components/TraningLog/TraningLogCard";
import CreateEditTrainingLog from "./CreateEditTrainingLog";
import "../../globals.css";

interface TrainingLog {
  _id?: string;
  title: string;
  animalID: string;
  date: string;
  hours: number;
  note: string;
  userEmail: string;
}

const TrainingLogScreen: React.FC = () => {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [view, setView] = useState<"list" | "create">("list");
  const [logToEdit, setLogToEdit] = useState<TrainingLog | null>(null);

  useEffect(() => {
    if (view === "list") {
        fetch("/api/animal?userEmail=jackson@gmail.com")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch training logs");
          }
          return res.json();
        })
        .then((data) => {
          setLogs(data.logs || []);
        })
        .catch((err) => console.error("Error fetching training logs:", err));
    }
  }, [view]);

  const handleCreateClick = () => {
    setLogToEdit(null);
    setView("create");
  };

  const handleEditClick = (log: TrainingLog) => {
    setLogToEdit(log);
    setView("create");
  };

  const handleBackToList = () => {
    setView("list");
  };

  return (
    <div className={styles.mainContent}>
      {view === "list" ? (
        <>
          <div className={styles.header}>
            <h2>Training Logs</h2>
            <button className={styles.createButton} onClick={handleCreateClick}>
              + Create new
            </button>
          </div>
          <div className={styles.logList}>
            {logs.map((log) => (
              <TrainingLogCard
                key={log._id}
                date={log.date}
                title={log.title}
                hours={log.hours}
                animalID={log.animalID}
                note={log.note}
                onEdit={() => handleEditClick(log)}
              />
            ))}
          </div>
        </>
      ) : (
        <CreateEditTrainingLog
          onCancel={handleBackToList}
          onSuccess={handleBackToList}
        />
      )}
    </div>
  );
};

export default TrainingLogScreen;
