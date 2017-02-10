import React from 'react'

import {
  Row,
  Col,
  Grid,
} from '@sketchpixy/rubix'

export default class Footer extends React.Component {
  render() {
    let year = new Date().getFullYear()
    return (
      <div id='footer-container'>
        <Grid id='footer' className='text-center'>
          <Row>
            <Col xs={12}>
              <div>© {year} Private Handbook</div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
