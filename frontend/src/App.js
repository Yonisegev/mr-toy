import React from 'react';
import { Outlet } from 'react-router';
import './App.css';
import { AppHeader } from './cmps/AppHeader';
import { ToastMessage } from './cmps/ToastMessage';
function App() {
  return (
    <div className='App'>
      <ToastMessage />
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;
