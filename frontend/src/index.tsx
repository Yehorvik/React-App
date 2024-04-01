import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { error } from 'console';

axios.defaults.baseURL = "http://localhost:3000" //`${process.env.SERVER_HOST}:${process.env.BACKEND_PORT}`.length==0? "localhost:3000":`${process.env.SERVER_HOST}:${process.env.BACKEND_PORT}`
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use((config) =>{
  console.log('Starting Request', JSON.stringify(config, null, 2))
  return config;
},
(error) => {
  console.log(JSON.stringify( error))
  return Promise.reject(error);
})
axios.interceptors.response.use((config) =>{
  console.log('Starting Request', JSON.stringify(config, null, 2))
  return config;
},
(error) => {
  console.log(JSON.stringify( error))
  return Promise.reject(error);
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={setupStore}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
