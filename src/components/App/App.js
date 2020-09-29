import React from 'react';
import { Main } from '../Main'; 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import * as ROUTES from '../../constants/routes'; 

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={ROUTES.HOME}>
            <Main/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
