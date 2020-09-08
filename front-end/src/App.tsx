import React from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './app.scss'

import PatientsPage from './pages/PatientsPage'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/patients">
          <PatientsPage/>
        </Route>

        <Redirect to='/patients'/>
      </Switch>
    </Router>
  );
}

export default App
