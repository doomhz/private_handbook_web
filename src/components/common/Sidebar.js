import React from 'react'
import {Link} from 'react-router'
import Gravatar from 'react-gravatar'
import {get} from 'lodash'
import {
  Sidebar, SidebarNav, SidebarNavItem,
  Grid, Row, Col
} from '@sketchpixy/rubix'

const getPath = (path)=> `/${path}`

const ApplicationSidebar = (props)=> {
  const router = {
    location: props.location,
    push: props.history.push,
    replace: props.history.replace,
    go: props.history.go,
    goBack: props.history.goBack,
    goForward: props.history.goForward,
    setRouteLeaveHook: ()=>{},
    isActive: props.history.isActive
  }
  return (
    <div>
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-nav-container'>
              <SidebarNav style={{marginBottom: 0}}>
                <SidebarNavItem glyph='icon-fontello-home' name='Home' router={router} href={getPath('')} />
                <SidebarNavItem glyph='icon-fontello-list-bullet' name='Todos' router={router} href={getPath('todos')} />
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
                {!email &&
                  <div>
                    <Link to="login" style={{color:'#FFF'}}>Log In</Link> ~ <Link to="signup" style={{color:'#FFF'}}>Sign up</Link>
                  </div>
                }
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