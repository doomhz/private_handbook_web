import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { login, resetLoginErrors } from '../store/auth/actions'
import * as authSelectors from '../store/auth/selectors'
import AuthForm from '../components/AuthForm'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillMount(){
    this.props.dispatch(resetLoginErrors())
  }
  componentWillReceiveProps(nextProps){
    if (!this.props.currentUser && nextProps.currentUser) {
      browserHistory.push('/todos')
    }
  }
  handleFormSubmit(ev){
    ev.preventDefault()
    if (!this.state.email || !this.state.password) return
    this.props.dispatch(login(this.state))
  }
  handleFieldChange(ev){
    this.setState({[ev.target.name]: ev.target.value})
  }
  render() {
    return (
      <div className='login'>
        <AuthForm
          onSubmit={(ev)=> this.handleFormSubmit(ev)}
          onFieldChange={(ev)=> this.handleFieldChange(ev)}
          buttonText="Log in"
          error={this.props.error}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=> ({
  error: authSelectors.getLoginErrors(state),
  currentUser: authSelectors.getCurrentUser(state)
})

export default connect(mapStateToProps)(Login);