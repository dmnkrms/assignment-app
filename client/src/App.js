import React from "react";
import "./App.css";
import CompaniesList from "./components/CompaniesList";
import Company from "./components/Company";
import CompanyAddForm from "./components/CompanyAddForm";
import CompanyEditForm from "./components/CompanyEditForm";
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Grid, Icon } from "semantic-ui-react";

function App() {
  return (
    <Container>
      <div className="Header">
        <Grid colums={2} stackable>
          <Grid.Row>
            <Grid.Column verticalAlign="middle"  computer={1} mobile={2} tablet={2} textAlign='center'>
              <Icon name="building outline" size="big" />
            </Grid.Column>
            <Grid.Column verticalAlign="bottom" computer={5} mobile={8} tablet={8}>
              <h1>Company application</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Router>
        <Switch>
          <Route path="/" exact component={CompaniesList} />
          <Route path="/company/add" component={CompanyAddForm} />
          <Route path="/company/:id" exact component={Company} />
          <Route path="/company/:id/edit" exact component={CompanyEditForm} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
