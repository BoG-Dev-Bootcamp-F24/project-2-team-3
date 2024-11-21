import React, { useState, useEffect } from "react";
import styles from "./CreateEditTrainingLog.module.css";

interface TrainingLog {
  _id?: string;
  date: string;
  title: string;
  hours: number;
  user: string;
  breed: string;
  animal: string;
  description: string;
}

interface CreateEditTrainingLogProps {
  logToEdit?: TrainingLog | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateEditTrainingLog: React.FC<CreateEditTrainingLogProps> = ({
  logToEdit,
  onCancel,
  onSuccess,
}) => {
  const [log, setLog] = useState<TrainingLog>({
    date: new Date().toISOString().split("T")[0],
    title: "",
    hours: 0,
    user: "",
    breed: "",
    animal: "",
    description: "",
  });

  useEffect(() => {
    if (logToEdit) {
      setLog(logToEdit);
    }
  }, [logToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setLog({ ...log, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = logToEdit
      ? `/api/training-logs/${logToEdit._id}`
      : "/api/training-logs";
    const method = logToEdit ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error saving training log");
        }
        return res.json();
      })
      .then(() => {
        onSuccess(); // Notify parent of success
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <div className={styles["log-create-container"]}>
      <h1>{logToEdit ? "Edit Training Log" : "Create Training Log"}</h1>
      <form onSubmit={handleSubmit} className={styles["log-form"]}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={log.title}
          onChange={handleChange}
          required
        />
        <select
          name="animal"
          value={log.animal}
          onChange={handleChange}
          required
        >
          <option value="">Select Animal</option>
          <option value="Lucy - Golden Retriever">
            Lucy - Golden Retriever
          </option>
          {/* Add more options as needed */}
        </select>
        <input
          type="number"
          name="hours"
          placeholder="Total hours trained"
          value={log.hours}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="month"
          placeholder="Month"
          value={log.date.split("-")[1]} // Assuming date is in YYYY-MM-DD format
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="day"
          placeholder="Date"
          value={log.date.split("-")[2]}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={log.date.split("-")[0]}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Note"
          value={log.description}
          onChange={handleChange}
          required
        />
        <div className={styles["button-group"]}>
          <button type="submit" className={styles["save-button"]}>
            {logToEdit ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className={styles["cancel-button"]}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditTrainingLog;
