import React from 'react';
import { Main } from '../Main'; 
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Main/>
      </Router>
    </div>
  );
}

export default App;
