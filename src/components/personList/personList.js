import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { encode } from "base-64";	

import { Link } from 'react-router-dom';

class PersonList extends Component {

  constructor(props) {
    super(props);
    this.state = {persons: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
	let username = 'admin';
	let password = 'admin123';
    fetch('/persons', { 
    	method: 'get',
    	  headers: new Headers({
    	    'Authorization': 'Basic ' + encode(username + ":" + password),
    	    'Content-Type': 'application/json'
    	  })
    })
      .then(response => response.json())
      .then(data => this.setState({persons: data.person, isLoading: false}));
  }

  
  async remove(id) {
	let username = 'admin';
	let password = 'admin123';
    await fetch(`/persons/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encode(username + ":" + password),
      }
    }).then(() => {
      let updatedPersons = [...this.state.persons].filter(i => i.id !== id);
      this.setState({persons: updatedPersons});
    });
  }

  render() {
    const {persons, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const PersonList = persons.map(person => {
 
      return <tr key={person.id}>
        <td style={{whiteSpace: 'nowrap'}}>{person.first_name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{person.last_name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{person.age}</td>
        <td style={{whiteSpace: 'nowrap'}}>{person.favourite_color}</td>
        <td style={{whiteSpace: 'nowrap'}}>{person.hobby.toString()}</td>
     
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="secondary" tag={Link} to={"/persons/" + person.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(person.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
     
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/persons/new">Add Person</Button>
          </div>
          <h3>Person REST api UI flow</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">First Name</th>
              <th width="20%">Last Name</th>
              <th width="10%">Age</th>             
              <th width="10%">Color</th>
              <th width="30%">Hobbies</th>
            </tr>
            </thead>
            <tbody>
            {PersonList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PersonList;