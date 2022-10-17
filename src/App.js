import React, { Component } from 'react';
import Login from './components/login/Login';

import Dashboard from './components/dashboard/ApplicationToRedirect';

import Video from './components/video/Video';
import { Route, Routes,BrowserRouter as Router } from 'react-router-dom'  
import ApplicationToRedirect from './components/dashboard/ApplicationToRedirect';
class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
				<Routes>  
				<Route path="auth" element={<ApplicationToRedirect />} />
				<Route path="" element={<Login />} />
				</Routes>
				</Router>
			</div>
		);
	}
}

export default App;
