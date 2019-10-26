import React, { useState, useEffect } from "react";
import companyService from "../services/Companies";
import { Link } from "react-router-dom";
import Owners from "./Owners";
import {
  Grid,
  Icon,
  Header,
  List,
  Divider,
  Card,
  Button,
  Loader
} from "semantic-ui-react";

const Company = ({ match }) => {
  const [company, setCompany] = useState({});
  const [owners, setOwners] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchCompany(match.params.id);
  }, [match.params.id]);

  const fetchCompany = id => {
    companyService
      .getCompany(id)
      .then(request => {
        setLoaded(true);
        setCompany(request.data.data);
        setOwners(request.data.owners);
      })
      .catch(err => {
        setCompany(null);
        console.log(err);
      });
  };

  if (company === null) {
    return (
      <div className="Header">
        <Card raised centered className="ErrorCard">
          <Card.Content>
            <Card.Header>This company does not exist</Card.Header>
            <Card.Description>
              <Link to={"/"}>
                <Button basic color="red">
                  <Icon name="home" />
                  Go Home
                </Button>
              </Link>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  } else if (loaded) {
    return (
      <div>
        <Divider />
        <Link to={"/"}>
          <Button basic size="tiny">
            <Icon name="arrow left" />
            Go back
          </Button>
        </Link>
        <Header as="h1">
          <Header.Content>{company.name}</Header.Content>
          <Header.Subheader>
            <a href={`/company/${company.id}/edit`}>
              Edit <Icon fitted name="edit outline" />
            </a>
          </Header.Subheader>
        </Header>
        <div className="CompanyInfo">
          <Grid colums={2} stackable>
            <Grid.Row divided>
              <Grid.Column computer={5} mobile={10} tablet={8}>
                <List>
                  <List.Item
                    className="ListItem"
                    icon="marker"
                    content={`${company.city}, ${company.country}`}
                  />
                  <List.Item
                    className="ListItem"
                    icon="building outline"
                    content={company.address}
                  />
                  <List.Item
                    className="ListItem"
                    icon="mail"
                    content={
                      company.email ? (
                        <a href={`mailto:${company.email}`}>{company.email}</a>
                      ) : (
                        "No email setuped yet"
                      )
                    }
                  />
                  <List.Item
                    className="ListItem"
                    icon="phone"
                    content={
                      company.phonenumber
                        ? company.phonenumber
                        : "No phone number setuped yet"
                    }
                  />
                </List>
              </Grid.Column>
              <Grid.Column computer={6} mobile={10} tablet={8}>
                <h3>Beneficial owners:</h3>
                <Owners
                  companyid={company.id}
                  owners={owners}
                  setOwners={setOwners}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  } else {
    return <Loader size="medium" active inline="centered" />;
  }
};

export default Company;
