import React from 'react';

import {
  Row, Col
} from '@sketchpixy/rubix';

export default class Todos extends React.Component {
  render() {
    return (
      <div className='todos'>
        <Row>
          <Col sm={12}>
            <h1>Todos</h1>
            <p>Soon...</p>
          </Col>
        </Row>
      </div>
    );
  }
}
