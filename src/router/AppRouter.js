import React from 'react';
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
  return (
    <div>
        <Router>
            <Switch>
                <Route exact path='/login' component={LoginScreen}>
                </Route>

                <Route exact path='/' component={CalendarScreen}>
                </Route>

                <Redirect to='/'></Redirect>
            </Switch>
        </Router>
 {/*
        // exact /login
        // exact /calendar
     */}
    </div>
    
  )
}
