import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import NeoData from './sample-neo';
import DisplayData from './DisplayData';
import { NavBar } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">hazardous asteroids</h1>
        </header>
        <DisplayData />
      </div>
    );
  }
}

export default App;
