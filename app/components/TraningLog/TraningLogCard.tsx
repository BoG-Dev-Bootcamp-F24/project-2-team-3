import React from 'react';
import styles from './TrainingLogCard.module.css';
import { useState, useEffect } from 'react';

interface TrainingLogCardProps {
  title: string;
  animalID: string;
  date: string;
  hours: number;
  note: string;
  onEdit: () => void;
}

interface TrainingLog {
  _id?: string;
  title: string;
  animalID: string;
  date: string;
  hours: number;
  note: string;
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
}

const TrainingLogCard: React.FC<TrainingLogCardProps> = ({
  date,
  title,
  hours,
  animalID,
  note,
  onEdit,
}) => {
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    fetch(`/api/animal/${animalID}`)
      .then((res) => res.json())
      .then((data) => setAnimal(data.animal));
  }, [animalID]);

  return (
    <div className={styles.trainingLogCard}>
      <div className={styles.date}>{date}</div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        {animal && (
          <div className={styles.meta}>
            {animal.name} - {animal.breed} - {hours} hours
          </div>
        )}
        <div className={styles.description}>{note}</div>
      </div>
      <button className={styles.editButton}>✎</button>
    </div>
  );
};

export default TrainingLogCard;
