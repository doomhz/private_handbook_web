import React, { Component } from 'react';
import '../App.css';

import '../main.css';
import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar {...this.props} />
        <Header {...this.props} />
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
