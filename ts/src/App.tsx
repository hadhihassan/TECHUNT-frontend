// import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WebRouters from './util/ClientRoutes';

function App() {
  return (
    <Router>
      <WebRouters/>
    </Router>
  );
}

export default App;