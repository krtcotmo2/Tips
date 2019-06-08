import React, { PureComponent } from "react";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home";
import Even from "./pages/Even/Even";
import Itemize from "./pages/Itemize/Itemize";
import TotalSum from "./pages/TotalSum/TotalSum";

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Even" component={Even} />
          <Route exact path="/Itemize" component={Itemize} />
          <Route exact path="/TotalSum" component={TotalSum} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
