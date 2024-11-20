import React from 'react';
import './TitleBar.css';

export default function TitleBar() {
  return (
    <div className="titleBar">
      <img src="/bogprojectlogo.png" alt="BOG Project Logo" style={{ height: '40px', marginRight: '20px' }} />
      <h1>Progress</h1>
    </div>
  );
}