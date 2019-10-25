import React, { useState, useEffect } from "react";
import companyService from "../services/Companies";

import { Link } from "react-router-dom";
import Search from "./Search";

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    companyService
      .getAll()
      .then(request => {
        setCompanies(request.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Link to="/company/add">
        <button>Add new company</button>
      </Link>
      <Search searchString={searchString} setSearchString={setSearchString} />
      {companies
        .filter(company =>
          company.name.toLowerCase().includes(searchString.toLowerCase())
        )
        .map(company => (
          <div className="single-list" key={company.id}>
            <li>
              <Link to={`/company/${company.id}`}>{company.name}</Link>
              {company.city}
            </li>
          </div>
        ))}
    </div>
  );
}

export default CompaniesList;
