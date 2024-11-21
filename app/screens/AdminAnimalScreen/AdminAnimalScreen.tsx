"use client";
import React, { useEffect, useState } from "react";
import styles from "../AdminScreens.module.css";

interface Animal {
  _id: string;
  name: string;
  breed: string;
  hoursTrained: number;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  note: string;
  image?: string;
  userEmail: string;
}

export default function AdminAnimalScreen() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/admin/animals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch animals");
        return res.json();
      })
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Loading animals...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.adminScreen}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Animals</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search animals..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredAnimals.map((animal) => (
          <div key={animal._id} className={styles.card}>
            {animal.image && (
              <img
                src={animal.image}
                alt={animal.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              />
            )}
            <h3>{animal.name}</h3>
            <p>Breed: {animal.breed}</p>
            <p>Owner: {animal.userEmail}</p>
            <p>Hours Trained: {animal.hoursTrained}</p>
            <p>
              Birthday:{" "}
              {`${animal.birthMonth} ${animal.birthDay}, ${animal.birthYear}`}
            </p>
            {animal.note && <p>Note: {animal.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
