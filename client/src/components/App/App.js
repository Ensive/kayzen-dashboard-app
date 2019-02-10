import React, { Component } from 'react';
import LineChart from '../LineChart/LineChart';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

function Header() {
  return (
    <header className="App-header">
      <div className="App-logo">Dashboard</div>
    </header>
  );
}

function Main() {
  return (
    <div className="Container">
      <LineChart />
    </div>
  );
}

function Footer() {
  return (
    <footer className="App-footer">
      <small>&copy; All rights reserved {new Date().getFullYear()}</small>
    </footer>
  );
}

export default App;
