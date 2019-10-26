import React, { useState } from "react";
import companyService from "../services/Companies";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import { Icon, Header, Divider, Card, Button } from "semantic-ui-react";

const CompanyAddForm = () => {
  const emptyCompany = {
    name: "",
    city: "",
    country: "",
    address: "",
    email: "",
    phonenumber: ""
  };
  const [newCompany, setNewCompany] = useState(emptyCompany);
  const [notification, setNotification] = useState(null);

  const createCompany = event => {
    event.preventDefault();

    companyService
      .create(newCompany)
      .then(request => {
        setNotification(`New company added: '${request.data.name}'`);
        setNewCompany(emptyCompany);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleNewCompanyChange = event => {
    const value = event.target.value;
    setNewCompany({
      ...newCompany,
      [event.target.name]: value
    });
  };

  return (
    <div className="CompanyAddFrom">
      <Divider />
      <Link to={"/"}>
        <Button basic size="tiny">
          <Icon name="arrow left" />
          Go back
        </Button>
      </Link>
      <Header as="h1">
        <Header.Content>Add a new company</Header.Content>
      </Header>
      <Notification message={notification} />
      <Card centered fluid>
        <Card.Content>
          <Card.Meta>Create a new company by filling out the fields</Card.Meta>
          <Card.Description>
            <form className="ui form" onSubmit={createCompany}>
              <div className="required field">
                <label>Company name</label>
                <input
                  type="text"
                  name="name"
                  value={newCompany.name}
                  onChange={handleNewCompanyChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="required field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={newCompany.city}
                  onChange={handleNewCompanyChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="required field">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={newCompany.address}
                  onChange={handleNewCompanyChange}
                  placeholder="Address"
                  required
                />
              </div>
              <div className="required field">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={newCompany.country}
                  onChange={handleNewCompanyChange}
                  placeholder="Country"
                  required
                />
              </div>
              <div className="field">
                <label>E-mail</label>
                <input
                  type="text"
                  name="email"
                  value={newCompany.email}
                  onChange={handleNewCompanyChange}
                  placeholder="company@email.com"
                />
              </div>
              <div className="field">
                <label>Phone number</label>
                <input
                  type="text"
                  name="phonenumber"
                  value={newCompany.phonenumber}
                  onChange={handleNewCompanyChange}
                  placeholder="Phone number"
                />
              </div>
              <div className="FormButton">
                <button type="submit" className="ui button">
                  Submit
                </button>
              </div>
            </form>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CompanyAddForm;
