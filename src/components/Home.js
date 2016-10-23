import React from 'react';

import {
  Row,
  Col,
  Button
} from '@sketchpixy/rubix';

const APPSTORE_URL="https://itunes.apple.com/us/app/private-handbook/id1163154893"

export default class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Row>
          <Col sm={12}>
            <h1>Private Handbook</h1>
            <p>Soon accessible on web...</p>
            <Button
              lg
              bsStyle='success'
              block
              href={APPSTORE_URL}
            >
              Get it on AppStore now!
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
