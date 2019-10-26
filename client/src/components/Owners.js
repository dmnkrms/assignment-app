import React, { useState } from "react";
import ownersService from "../services/Owners";
import {
  Grid,
  Icon,
  Label,
  Form,
  Button,
} from "semantic-ui-react";

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
    <div className="BeneficialOwners">
      <Grid>
        <Grid.Row>
          {owners.length !== 0 ? (
            owners.map(owner => (
              <Label
                key={owner.id}
                as="a"
                onClick={() => deleteOwner(companyid, owner.id, owner.name)}
              >
                {owner.name}
                <Icon name="delete" />
              </Label>
            ))
          ) : (
            <p>There are no beneficial owners</p>
          )}
        </Grid.Row>
        <Grid.Row>
          {addOwnerForm ? (
            <Form onSubmit={addOwner} size="small">
              <Form.Group>
                <Form.Field
                  inline
                  control="input"
                  name="name"
                  placeholder="Name..."
                  required
                />
                <Button size="mini" type="submit">
                  Add
                </Button>
                <Button
                  basic
                  color="red"
                  size="mini"
                  type="button"
                  onClick={() => handleAddOwnerForm()}
                >
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          ) : (
            <Button
              size="mini"
              color='green'
              onClick={() => handleAddOwnerForm()}
            >
              <Icon name="plus" />
              Add beneficial owner
            </Button>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Owners;
