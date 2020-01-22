import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { encode } from "base-64";	


class PersonEdit extends Component {

  emptyItem = {
    first_name: '',
    last_name: '',
    age: '',
    favourite_color: '',
    hobby: ''
   
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  


  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const person = await (await fetch(`/persons/${this.props.match.params.id}`)).json();
      this.setState({item: person});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    if(name !== 'hobby') {
    item[name] = value;
    } 
    else{
    	item[name] = value.split(',');    	
    }
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
	let username = 'admin';
	let password = 'admin123';
    await fetch('/persons', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + encode(username + ":" + password),
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/persons');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Person' : 'Add Person'}</h2>;

    return <div>

      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input type="text" name="first_name" id="first_name" value={item.first_name || ''}
                   onChange={this.handleChange} autoComplete="first_name"/>
          </FormGroup>
            
            <FormGroup>
            <Label for="last_name">First Name</Label>
            <Input type="text" name="last_name" id="last_name" value={item.last_name || ''}
                   onChange={this.handleChange} autoComplete="last_name"/>
          </FormGroup>
            
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="text" name="age" id="age" value={item.age || ''}
                   onChange={this.handleChange} autoComplete="age"/>
          </FormGroup>
          <FormGroup>
            <Label for="favourite_color">Favourite Color</Label>
            <Input type="text" name="favourite_color" id="favourite_color" value={item.favourite_color || ''}
                   onChange={this.handleChange} autoComplete="favourite_color"/>
          </FormGroup>
       
         <FormGroup>
            <Label for="hobby">Hobbies</Label>
            <Input type="text" name="hobby" id="hobby" value={item.hobby || ''}
                   onChange={this.handleChange} autoComplete="hobby"/>
          </FormGroup>
       
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/persons">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PersonEdit);