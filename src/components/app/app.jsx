import React from 'react';
import {Router} from '@reach/router';
import Auth from '../auth/auth.jsx';
import '../../styles/index.js';
import './styles.css';
import Search from '../search/search.jsx';
import Home from '../home/home.jsx';

const App = () => {
  return (
    <main className="main">
      <div className="container">
        <Router>
          <Home path="/" />
          <Auth path="/auth" />
          <Search path="/search" />
        </Router>
      </div>
    </main>
  );
}

export default App;
