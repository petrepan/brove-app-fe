import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Overview from "./pages/dashboard/Overview";
import Portfolio from "./pages/dashboard/Portfolio";
import Loan from "./pages/dashboard/Loan";
import Profile from "./pages/dashboard/Profile";
import PrivateRoute from "./components/auth/PrivateRoute"
import PublicRoute from "./components/auth/PublicRoute";
import "./App.css";

function App() {
 return (
   <Router>
     <Switch>
       <Route path="/" component={Home} exact />
       <PublicRoute path="/register" component={Register} />
       <PublicRoute path="/login" component={Login} />
       <PrivateRoute path="/dashboard/overview" component={Overview} />
       <PrivateRoute path="/dashboard/portfolio" component={Portfolio} />
       <PrivateRoute path="/dashboard/loan" component={Loan} />
       <PrivateRoute path="/dashboard/profile" component={Profile} />
     </Switch>
   </Router>
 );
}

export default App;
