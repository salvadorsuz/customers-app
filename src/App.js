import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/customers/">Customers</Link>
        </div>
      </Router>
    );
  }
}

export default App;
