import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyC10V_8XRfwKLFjKXu8Tls3QHB_8XJnlD8",
    authDomain: "tonerdepot-99b36.firebaseapp.com",
    databaseURL: "https://tonerdepot-99b36.firebaseio.com",
    projectId: "tonerdepot-99b36",
    storageBucket: "tonerdepot-99b36.appspot.com",
    messagingSenderId: "72577716437",
    appId: "1:72577716437:web:3a4f50b4ac9f5641"
}
);


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
