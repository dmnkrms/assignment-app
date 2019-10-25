import React from "react";
import "./App.css";
import CompaniesList from "./components/CompaniesList";
import Company from "./components/Company";
import CompanyAddForm from "./components/CompanyAddForm";
import CompanyEditForm from "./components/CompanyEditForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={CompaniesList} />
          <Route path="/company/add" component={CompanyAddForm} />
          <Route path="/company/:id" exact component={Company} />
          <Route path="/company/:id/edit" exact component={CompanyEditForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
