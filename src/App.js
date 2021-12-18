import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import { AppHeader } from './cmps/AppHeader';

function App() {
  return (
    <div className='App'>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
