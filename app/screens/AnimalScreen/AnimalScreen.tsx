"use client";

import React, { useEffect, useState } from "react";
import styles from "./animal.css";
import CreateEditAnimal from "./CreateEditAnimal";

interface Animal {
  _id?: string;
  name: string;
  breed: string;
  hoursTrained: number;
  birthMonth: string;
  birthDate: string;
  birthYear: string;
  note: string;
  image?: string;
}

const AnimalScreen = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [view, setView] = useState<"list" | "create">("list"); // Manage view state
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null); // Store animal to edit

  useEffect(() => {
    if (view === "list") {
      fetch("/api/animals")
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
    }
  }, [view]);

  const handleCreateClick = () => {
    setAnimalToEdit(null); // Reset animalToEdit
    setView("create"); // Switch to create view
  };

  const handleEditClick = (animal: Animal) => {
    setAnimalToEdit(animal); // Set the animal to edit
    setView("create"); // Switch to create view
  };

  const handleBackToList = () => {
    setView("list"); // Switch back to list view
  };

  return (
    <div className={styles.mainContent}>
      {view === "list" ? (
        <>
          <div className={styles.header}>
            <h2>Animals</h2>
            <button
              className={styles.createButton}
              onClick={handleCreateClick}
            >
              + Create new
            </button>
          </div>
          <div className={styles.animalGrid}>
            {animals.map((animal) => (
              <div key={animal._id} className={styles.animalCard}>
                <img
                  src={animal.image || "/default.png"}
                  alt={animal.name}
                  className={styles.animalImage}
                />
                <h3>{animal.name}</h3>
                <p>Breed: {animal.breed}</p>
                <p>Hours Trained: {animal.hoursTrained}</p>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditClick(animal)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <CreateEditAnimal
          animalToEdit={animalToEdit}
          onCancel={handleBackToList}
          onSuccess={handleBackToList}
        />
      )}
    </div>
  );
};

export default AnimalScreen;
