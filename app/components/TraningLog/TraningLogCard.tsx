import React from 'react';
import styles from './TrainingLogCard.module.css';

interface TrainingLogCardProps {
  date: string;
  title: string;
  hours: number;
  user: string;
  breed: string;
  animal: string;
  description: string;
}

const TrainingLogCard: React.FC<TrainingLogCardProps> = ({
  date,
  title,
  hours,
  user,
  breed,
  animal,
  description,
}) => {
  return (
    <div className={styles.trainingLogCard}>
      <div className={styles.date}>{date}</div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>
          {user} - {breed} - {animal} - {hours} hours
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <button className={styles.editButton}>✎</button>
    </div>
  );
};

export default TrainingLogCard;
