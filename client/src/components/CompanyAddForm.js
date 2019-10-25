import React, { useState } from "react";
import companyService from "../services/Companies";
import Notification from './Notification';
import {Link} from 'react-router-dom';

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
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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
    <div>
    <Notification message={notification}/>
    <Link to={"/"}>
          <button>Home</button>
        </Link>
    <form onSubmit={createCompany}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={newCompany.name}
          onChange={handleNewCompanyChange}
          placeholder="Name..."
          required
        />
      </label>
      <label>
        City:
        <input
          type="text"
          name="city"
          value={newCompany.city}
          onChange={handleNewCompanyChange}
          placeholder="City..."
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={newCompany.address}
          onChange={handleNewCompanyChange}
          placeholder="Address..."
          required
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={newCompany.country}
          onChange={handleNewCompanyChange}
          placeholder="Country..."
          required
        />
      </label>
      <label>
        E-mail:
        <input
          type="text"
          name="email"
          value={newCompany.email}
          onChange={handleNewCompanyChange}
          placeholder="company@email.com"
        />
      </label>
      <label>
        Phone number:
        <input
          type="text"
          name="phonenumber"
          value={newCompany.phonenumber}
          onChange={handleNewCompanyChange}
          placeholder="Phone number..."
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
};

export default CompanyAddForm;
