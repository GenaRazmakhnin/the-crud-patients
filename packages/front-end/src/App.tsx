//import userEvent from '@testing-library/user-event'
import React from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './app.scss'
//import { useDispatch, useSelector } from 'react-redux'
//import { RootState } from './types/store'
//import { User } from './types/entities'
//import { setUsers } from './store/user/actions'
import PatientsPage from './pages/PatientsPage'

//{ usersList.data.map((user: User) => (
//  <div key={user.id}>{user.firstName} {user.lastName}</div>
//)) }
//<button onClick={() => dispatch(setUsers({ data: [user, user2] }))}>click</button>

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/patients">
          <PatientsPage/>
        </Route>

        <Redirect to='/patients' />
      </Switch>
    </Router>
  );
}

export default App
