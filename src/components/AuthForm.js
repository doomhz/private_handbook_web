import React from 'react'
import {
  Form, FormGroup, FormControl, ControlLabel,
  Col, Button, Alert
} from '@sketchpixy/rubix'

const AuthForm = (props)=> (
  <Form horizontal onSubmit={props.onSubmit}>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Email
      </Col>
      <Col sm={10}>
        <FormControl type="email" placeholder="Email" name="email" onChange={props.onFieldChange} />
      </Col>
    </FormGroup>
    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={2}>
        Password
      </Col>
      <Col sm={10}>
        <FormControl type="password" placeholder="Password" name="password" onChange={props.onFieldChange} />
      </Col>
    </FormGroup>
    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Button type="submit">{props.buttonText}</Button>
      </Col>
    </FormGroup>
    {props.error &&
      <Alert danger>
        <span>{props.error}</span>
      </Alert>
    }
  </Form>
)

AuthForm.defaultProps = {
  buttonText: 'Authorize'
}

AuthForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onFieldChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  buttonText: React.PropTypes.string
}

export default AuthForm