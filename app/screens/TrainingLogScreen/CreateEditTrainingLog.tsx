import React, { useState, useEffect } from "react";
import styles from "./CreateEditTrainingLog.module.css";

interface TrainingLog {
  _id?: string;
  title: string;
  animalID: string;
  date: string;
  hours: number;
  note: string;
  userEmail: string;
}

interface Animal {
  _id?: string;
  name: string;
  breed: string;
  hoursTrained: number;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  note: string;
  image?: string;
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
    userEmail: "jackson@gmail.com",
    note: "",
    animalID: "",
  });

  const [animals, setAnimals] = useState<Animal[]>([]);
  const userEmail = "jackson@gmail.com"; // Replace with the actual user's email

  useEffect(() => {
    fetch(`/api/animal?userEmail=${userEmail}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch animals");
        }
        return res.json();
      })
      .then((data) => {
        setAnimals(data.animals || []);
      })
      .catch((err) => console.error("Error fetching animals:", err));
  }, [userEmail]);

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
          name="animalID"
          value={log.animalID.toString()}
          onChange={handleChange}
          required
        >
          <option value="">Select Animal</option>
          {animals.map(animal => (
            animal._id ? (
            <option key={animal._id} value={animal._id.toString()}>
              {animal.name} - {animal.breed}
              </option>
            ) : null
          ))}
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
          value={log.note}
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
