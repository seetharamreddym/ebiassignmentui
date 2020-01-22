import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PersonList from './components/personList/personList';
import PersonEdit from './components/personEdit/personEdit';

function App() {
	

  return (
		  <Router>
	        <Switch>
	         
	          <Route path='/persons' exact={true} component={PersonList}/>" +
	          <Route path='/persons/:id' component={PersonEdit}/>
	        </Switch>
	      </Router>
  );
}

export default App;
