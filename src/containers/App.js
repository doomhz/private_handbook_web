import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as authSelectors from '../store/auth/selectors'
import { logout } from '../store/auth/actions'
import { syncTodos } from '../store/todos/actions'
import '../App.css';
import '../main.css';
import {
  Grid, Row, Col, MainContainer
} from '@sketchpixy/rubix';

/* Common Components */
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const App = (props)=> {
  return (
    <MainContainer {...props}>
      <Sidebar {...props} />
      <Header {...props} />
      <div id='body'>
        <Grid>
          <Row>
            <Col xs={12}>
              {props.children}
            </Col>
          </Row>
        </Grid>
      </div>
      <Footer />
    </MainContainer>
  );
}

const mapStateToProps = (state)=> ({
  user: authSelectors.getCurrentUser(state)
})

const mapDispatchToProps = (dispatch, ownProps, more) => ({
  onLogout: () => {
    dispatch(logout())
    browserHistory.push("/")
  },
  onSync: ()=> dispatch(syncTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);