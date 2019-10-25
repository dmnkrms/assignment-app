import React, { useState, useEffect } from "react";
import companyService from "../services/Companies";
import { Link } from "react-router-dom";
import Owners from "./Owners";

const Company = ({ match }) => {
  const [company, setCompany] = useState({});
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchCompany(match.params.id);
  }, [match.params.id]);

  const fetchCompany = id => {
    companyService
      .getCompany(id)
      .then(request => {
        setCompany(request.data.data);
        setOwners(request.data.owners);
      })
      .catch(err => {
        setCompany(null);
        console.log(err);
      });
  };

  let content = "";
  if (company === null) {
    content = (
      <div>
        <h4>This company does not exist</h4>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    );
  } else {
    content = (
      <div>
        <h4>{company.name}</h4>
        <p>{company.city}</p>
        <Owners companyid={company.id} owners={owners} setOwners={setOwners} />
        <Link to={`/company/${company.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    );
  }

  return content;
};

export default Company;
