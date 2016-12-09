import React from 'react';
import {Link} from 'react-router';
import Gravatar from 'react-gravatar';
import {get} from 'lodash';
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
                <SidebarNavItem glyph='icon-fontello-home' name='Home' router={{location:props.location}} href={getPath('')} />
                <SidebarNavItem glyph='icon-fontello-list-bullet' name='Todos' router={{location:props.location}} href={getPath('todos')} />
              </SidebarNav>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

const SidebarContainer = (props)=> {
  let email = get(props, 'user.email')
  return (
    <div id='sidebar'>
      <div id='avatar'>
        <Grid>
          <Row className='fg-white'>
            <Col xs={4} collapseRight>
              {email &&
                <Gravatar email={email} size={40} />
              }
              {!email &&
                <img src='/imgs/app/avatars/avatar17.png' width='40' height='40' role="presentation" />
              }
            </Col>
            <Col xs={8} collapseLeft id='avatar-col'>
              <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>
                {email}
                {!email && <Link to="login" style={{color:"#FFF"}}>Log In</Link>}
              </div>
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