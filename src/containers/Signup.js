import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signup, resetSignupErrors } from '../store/auth/actions'
import * as authSelectors from '../store/auth/selectors'
import AuthForm from '../components/AuthForm'

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillMount(){
    this.props.dispatch(resetSignupErrors())
  }
  componentWillReceiveProps(nextProps){
    if (!this.props.currentUser && nextProps.currentUser) {
      browserHistory.push('/todos')
    }
  }
  handleFormSubmit(ev){
    ev.preventDefault()
    if (!this.state.email || !this.state.password) return
    this.props.dispatch(signup(this.state))
  }
  handleFieldChange(ev){
    this.setState({[ev.target.name]: ev.target.value})
  }
  render() {
    return (
      <div className='signup'>
        <AuthForm
          onSubmit={(ev)=> this.handleFormSubmit(ev)}
          onFieldChange={(ev)=> this.handleFieldChange(ev)}
          buttonText="Sign Up"
          error={this.props.error}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=> ({
  error: authSelectors.getSignupErrors(state),
  currentUser: authSelectors.getCurrentUser(state)
})

export default connect(mapStateToProps)(Signup);