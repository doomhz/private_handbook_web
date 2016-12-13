import React from 'react';
import { browserHistory } from 'react-router';
import {
  signup
} from '../helpers/Auth'
import {
  Form, FormGroup, FormControl, ControlLabel,
  Col, Button
} from '@sketchpixy/rubix';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  handleFormSubmit(ev){
    ev.preventDefault()
    if (!this.state.email || !this.state.password) return
    signup(this.state.email, this.state.password)
    .then(()=> {
      browserHistory.push('/todos')
    })
    .catch((error)=> alert(error.message))
  }
  handleFieldChange(ev){
    this.setState({[ev.target.name]: ev.target.value})
  }
  render() {
    return (
      <div className='signup'>
        <Form horizontal onSubmit={(ev)=> this.handleFormSubmit(ev)}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" name="email" onChange={(ev)=> this.handleFieldChange(ev)} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" name="password" onChange={(ev)=> this.handleFieldChange(ev)} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign up</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
