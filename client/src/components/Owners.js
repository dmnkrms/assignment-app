import React, { useState } from "react";
import Button from "./Button";
import ownersService from "../services/Owners";

const Owners = ({ companyid, owners, setOwners }) => {
  const [addOwnerForm, setAddOwnerForm] = useState(false);
  const addOwner = event => {
    event.preventDefault();
    const newOwner = {
      name: event.target.name.value
    };

    if (owners.find(owner => owner.name === event.target.name.value)) {
      alert(`Owner with name '${event.target.name.value}' already exist`);
      return;
    }

    ownersService.create(companyid, newOwner).then(response => {
      setOwners(owners.concat(response.data));
      setAddOwnerForm(false);
    });
  };
  const deleteOwner = (companyid, id, name) => {
    if (window.confirm(`Do you really want to remove '${name}' ?`)) {
      ownersService
        .deleteOwner(companyid, id)
        .then(() => {
          setOwners(owners.filter(o => o.id !== id));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleAddOwnerForm = () => {
    setAddOwnerForm(!addOwnerForm);
  };

  return (
    <div>
      {addOwnerForm ? (
        <div>
          <form onSubmit={addOwner}>
            <label>
              Name:
              <input type="text" name="name" placeholder="Name..." required />
            </label>
            <input type="submit" value="Add"/>
          </form>
          <Button onClick={() => handleAddOwnerForm()} text="x" />
        </div>
      ) : (
        <Button
          onClick={() => handleAddOwnerForm()}
          text="Add beneficial owner"
        />
      )}

      {owners.map(owner => (
        <li key={owner.id}>
          {owner.name}
          <Button
            onClick={() => deleteOwner(companyid, owner.id, owner.name)}
            text="Delete"
          />
        </li>
      ))}
    </div>
  );
};

export default Owners;
