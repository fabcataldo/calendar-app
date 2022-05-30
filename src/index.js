import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';

import './styles.css';
console.log(process.env)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>
);

