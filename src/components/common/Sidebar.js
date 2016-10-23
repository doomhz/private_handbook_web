import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  Grid, Row, Col
} from '@sketchpixy/rubix';

const getPath = (path)=> `/${path}`

const ApplicationSidebar = (props)=> {
  return (
    <div>
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-nav-container'>
              <SidebarNav style={{marginBottom: 0}}>
                <SidebarNavItem glyph='icon-fontello-home' name='Home' href={getPath('')} />
                <SidebarNavItem glyph='icon-fontello-list-bullet' name='Todos' href={getPath('todos')} />
              </SidebarNav>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

const SidebarContainer = (props)=> {
  return (
    <div id='sidebar'>
      <div id='avatar'>
        <Grid>
          <Row className='fg-white'>
            <Col xs={4} collapseRight>
              <img src='/imgs/app/avatars/avatar17.png' width='40' height='40' role="presentation" />
            </Col>
            <Col xs={8} collapseLeft id='avatar-col'>
              <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>Anonymous</div>
            </Col>
          </Row>
        </Grid>
      </div>
      <div id='sidebar-container'>
        <Sidebar sidebar={0}>
          <ApplicationSidebar {...props} />
        </Sidebar>
      </div>
    </div>
  )
}

export default SidebarContainer