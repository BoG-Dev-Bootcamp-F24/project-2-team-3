import React from 'react';
import Sidebar from '../SideBar/SideBar';
import TitleBar from '../TitleBar/TitleBar';
import TrainingLogCard from '../TraningLog/TraningLogCard';
import styles from './Dash.module.css';

const Dash: React.FC = () => {
  const trainingLogs = [
    {
      date: '20 Oct - 2023',
      title: 'Complete sit lessons',
      hours: 20,
      user: 'Long Lam',
      breed: 'Golden Retriever',
      animal: 'Lucy',
      description: 'Lucy finishes the sit lessons very well today. Should give her a treat.',
    },
  ];

  return (
    <div className={styles.dash}>
      <Sidebar />
      <div className={styles.content}>
        <TitleBar />
        <button className={styles.createButton}>+ Create New</button>
        <div className={styles.trainingLog}>
          {trainingLogs.map((log, index) => (
            <TrainingLogCard key={index} {...log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dash;
