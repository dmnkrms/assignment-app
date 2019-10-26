import React, { useState, useEffect } from "react";
import companyService from "../services/Companies";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Grid, Icon, Label, Divider, Card, Loader } from "semantic-ui-react";

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    companyService
      .getAll()
      .then(request => {
        setLoaded(true);
        setCompanies(request.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Grid colums={2} stackable padded="vertically">
      <Grid.Row>
        <Grid.Column computer={4} mobile={4} tablet={4} stretched>
          <Search
            searchString={searchString}
            setSearchString={setSearchString}
          />
        </Grid.Column>
        <Grid.Column
          computer={4}
          mobile={4}
          tablet={4}
          verticalAlign="middle"
          textAlign="center"
        >
          <Link to="/company/add">
            <Label>
              <Icon name="plus" />
              <Label.Detail>Add a new company</Label.Detail>
            </Label>
          </Link>
        </Grid.Column>
      </Grid.Row>
      <Divider fitted />
      <Grid.Row>
        {loaded ? (
          <Grid.Column>
            <Card.Group itemsPerRow={4} stackable>
              {companies
                .filter(company =>
                  company.name
                    .toLowerCase()
                    .includes(searchString.toLowerCase())
                )
                .map(company => (
                  <Card
                    key={company.id}
                    as={Link}
                    to={`/company/${company.id}`}
                  >
                    <Card.Content>
                      <Card.Header>{company.name}</Card.Header>
                      <Card.Meta>
                        <Icon name="map marker" size="small" />
                        {` ${company.city}, ${company.country}`}
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
            </Card.Group>
          </Grid.Column>
        ) : (
          <Loader size="medium" active inline="centered"/>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default CompaniesList;
