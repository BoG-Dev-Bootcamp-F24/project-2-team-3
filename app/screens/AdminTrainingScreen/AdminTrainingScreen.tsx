"use client";
import React, { useEffect, useState } from "react";
import styles from "../AdminScreens.module.css";

interface TrainingLog {
  _id: string;
  title: string;
  date: string;
  hours: number;
  note: string;
  userEmail: string;
  animalID: string;
}

export default function AdminTrainingScreen() {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/admin/training")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch training logs");
        return res.json();
      })
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <div className={styles.loading}>Loading training logs...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.adminScreen}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Training Logs</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search training logs..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredLogs.map((log) => (
          <div key={log._id} className={styles.card}>
            <h3>{log.title}</h3>
            <p>Date: {new Date(log.date).toLocaleDateString()}</p>
            <p>Hours: {log.hours}</p>
            <p>User: {log.userEmail}</p>
            <p>Note: {log.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
