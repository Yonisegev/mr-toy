import React from 'react';
import { Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Hello!</h1>
      <Outlet />
    </div>
  );
}

export default App;
