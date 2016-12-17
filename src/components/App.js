import React, { Component } from 'react';
import '../App.css';

import '../main.css';
import {
  Grid, Row, Col, MainContainer
} from '@sketchpixy/rubix';

/* Common Components */
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import Footer from './common/Footer';

import {
  loadCurrentUser, signOut, registerAuthStateChangeEvent
} from '../helpers/Auth'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    this.loadCurrentUser()
    registerAuthStateChangeEvent(()=> this.loadCurrentUser())
  }
  loadCurrentUser(){
    loadCurrentUser().then((userData)=> this.setState({user: userData}))
  }
  signOut(){
    let afterLogOut = ()=> this.setState({user: null})
    signOut().then(afterLogOut).catch(afterLogOut)
  }
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar {...this.props} user={this.state.user} />
        <Header {...this.props} user={this.state.user} />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default App;
