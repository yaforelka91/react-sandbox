import React from 'react';
import { Router } from '@reach/router';
import Auth from '../auth/auth.jsx';
import '../../styles/index.js';
import './styles.scss';
import Search from '../search/search.jsx';
import Home from '../home/home.jsx';
import Map from '../map/map.jsx';

const App = () => {
  return (
    <main className="main">
      <Router>
        <Home path="/" />
        <Auth path="/auth" />
        <Search path="/search" />
        <Map path="/map" />
      </Router>
    </main>
  );
};

export default App;
