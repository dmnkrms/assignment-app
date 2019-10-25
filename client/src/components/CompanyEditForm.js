import React, { useState, useEffect } from "react";
import Button from "./Button";
import Notification from "./Notification";
import companyService from "../services/Companies";
import { Redirect } from "react-router-dom";

const CompanyEditForm = ({ match }) => {
  const [company, setCompany] = useState({});
  const [notification, setNotification] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchCompany(match.params.id);
  }, [match.params.id]);

  const fetchCompany = id => {
    companyService
      .getCompany(id)
      .then(request => {
        setCompany(request.data.data);
      })
      .catch(err => {
        setCompany(null);
        console.log(err);
      });
  };

  const updateCompany = event => {
    event.preventDefault();
    companyService
      .update(company.id, company)
      .then( request => {
        setCompany(request.data)
        setNotification(`Company '${request.data.name}' succesfully updated`);
        setTimeout(() => {
          setNotification(null);
        }, 5000)
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
  };

  if (redirect) {
    return <Redirect to="/" />
  } else {
    return (
      <div>
        <h1>EDIT</h1>
        <Button onClick={() => deleteCompany(company.id)} text="delete" />
        <Notification message={notification} />
        <form onSubmit={updateCompany}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              defaultValue={company.name}
              onChange={handleCompanyChange}
              placeholder="Name..."
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              defaultValue={company.city}
              onChange={handleCompanyChange}
              placeholder="City..."
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              defaultValue={company.address}
              onChange={handleCompanyChange}
              placeholder="Address..."
              required
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              defaultValue={company.country}
              onChange={handleCompanyChange}
              placeholder="Country..."
              required
            />
          </label>
          <label>
            E-mail:
            <input
              type="text"
              name="email"
              defaultValue={company.email}
              onChange={handleCompanyChange}
              placeholder="company@email.com"
            />
          </label>
          <label>
            Phone number:
            <input
              type="text"
              name="phonenumber"
              defaultValue={company.phonenumber}
              onChange={handleCompanyChange}
              placeholder="Phone number..."
            />
          </label>
          <input type="submit" value="Update" />
        </form>
      </div>
    );
  }
};

export default CompanyEditForm;
