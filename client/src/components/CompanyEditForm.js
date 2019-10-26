import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import companyService from "../services/Companies";
import { Redirect, Link } from "react-router-dom";
import {
  Icon,
  Header,
  Divider,
  Card,
  Button,
  Grid,
  Loader
} from "semantic-ui-react";

const CompanyEditForm = ({ match }) => {
  const [company, setCompany] = useState({});
  const [notification, setNotification] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [update, setUpdate] = useState(false);
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
      })
      .catch(err => {
        setCompany(null);
        console.log(err);
      });
  };

  const updateCompany = event => {
    event.preventDefault();
    if (!update) {
      setNotification("ERROR: No changes detected");
      return;
    }
    companyService
      .update(company.id, company)
      .then(request => {
        setNotification(`Company '${request.data.name}' succesfully updated`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteCompany = id => {
    if (window.confirm(`Do you really want to delete '${company.name}' ?`)) {
      companyService
        .deleteCompany(id)
        .then(() => {
          setRedirect(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleCompanyChange = event => {
    const value = event.target.value;
    setCompany({
      ...company,
      [event.target.name]: value
    });
    setUpdate(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  } else if (!loaded) {
    return <Loader size="medium" active inline="centered" />;
  } else {
    return (
      <div className="CompanyEditForm">
        <Divider />
        <Link to={`/company/${company.id}`}>
          <Button basic size="tiny">
            <Icon name="arrow left" />
            Go back
          </Button>
        </Link>
        <div className="EditTopRow">
          <Grid stackable columns="equal">
            <Grid.Row>
              <Grid.Column width={13}>
                <Header as="h1">
                  <Header.Content>{company.name}</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Button
                  size="tiny"
                  color="red"
                  content="Delete company"
                  icon="delete"
                  onClick={() => deleteCompany(company.id)}
                ></Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Notification message={notification} />
        <Card centered fluid>
          <Card.Content>
            <Card.Meta>Update company by filling out the fields</Card.Meta>
            <Card.Description>
              <form className="ui form" onSubmit={updateCompany}>
                <div className="required field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={company.city}
                    onChange={handleCompanyChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="required field">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={company.address}
                    onChange={handleCompanyChange}
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="required field">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={company.country}
                    onChange={handleCompanyChange}
                    placeholder="Country"
                    required
                  />
                </div>
                <div className="field">
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={company.email}
                    onChange={handleCompanyChange}
                    placeholder="company@email.com"
                  />
                </div>
                <div className="field">
                  <label>Phone number</label>
                  <input
                    type="text"
                    name="phonenumber"
                    defaultValue={company.phonenumber}
                    onChange={handleCompanyChange}
                    placeholder="Phone number"
                  />
                </div>
                <div className="FormButton">
                  <button type="submit" className="ui button">
                    Update
                  </button>
                </div>
              </form>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
};

export default CompanyEditForm;
