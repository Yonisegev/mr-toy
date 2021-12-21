import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as serviceWorker from './serviceWorker';
import './assets/styles/styles.scss';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ToyApp } from './pages/ToyApp';
import { ToyAdd } from './cmps/ToyAdd';
import { LoginSignup } from './pages/LoginSignup';
import { ToyEdit } from './pages/ToyEdit';
import { ToyDetails } from './pages/ToyDetails';
import { PrivateRoute } from './cmps/PrivateOutlet';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='toy' element={<ToyApp />}>
              <Route path='add' element={<ToyAdd />} />
              <Route
                path='edit/:toyId'
                element={
                  <PrivateRoute>
                    <ToyEdit />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path='/toy/:toyId' element={<ToyDetails />} />
            <Route path='login' element={<LoginSignup />} />
            <Route path='register' element={<LoginSignup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
