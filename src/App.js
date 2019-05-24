import React, { Component } from 'react';
import './App.css';
import AppRoutes from './AppRoutes';
import SubirArchivo from './SubirArchivo/SubirArchivo';
//import LoginGoogle from './LoginGoogle/LoginGoogle';

class App extends Component {


  
  render() {
    return (
      <div>
      <AppRoutes></AppRoutes>
      </div>
    );
  }
}

export default App;
