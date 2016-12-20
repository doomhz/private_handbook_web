import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import {
  signOut
} from '../../helpers/Auth'
import {
  syncUserTodos
} from '../../helpers/TodoStorage'
import {
  SidebarBtn, Navbar, Nav,
  NavDropdownHover, MenuItem,
  Icon, Grid, Row, Col
} from '@sketchpixy/rubix';

const getPath = (path)=> `/${path}`

const logOut = ()=> {
  signOut()
  .then(()=> {
    browserHistory.push('/')
  })
}

const syncTodods = (user)=> {
  if (!user) return browserHistory.push('login')
  syncUserTodos(user.uid)
  .then(()=> alert(`Successfully synced for ${user.email}.`))
  .catch(()=> alert(`Could not sync for ${user.email}. Please try again.`))
}

const Brand = (props)=> {
  return (
    <Navbar.Header {...props}>
      <Navbar.Brand tabIndex='-1'>
        <Link to={getPath('')}>
          <img src='/imgs/common/logo.png' alt='rubix' width='28' height='28' />
        </Link>
      </Navbar.Brand>
    </Navbar.Header>
  );
}

const HeaderNavigation = (props)=> {
  return (
    <Nav pullRight>
      <Nav>
        {props.user &&
          <NavDropdownHover eventKey={3} title={<Icon glyph='icon-fontello-menu' />} noCaret={true} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} onClick={(ev)=> syncTodods(props.user)}>Sync</MenuItem>
            <MenuItem eventKey={3.2} onClick={(ev)=> logOut()}>Logout</MenuItem>
          </NavDropdownHover>
        }
        {!props.user &&
          <NavDropdownHover eventKey={3} title={<Icon glyph='icon-fontello-menu' />} noCaret={true} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} onClick={(ev)=> syncTodods(props.user)}>Sync</MenuItem>
            <MenuItem eventKey={3.2} onClick={(ev)=> browserHistory.push('login')}>Login</MenuItem>
            <MenuItem eventKey={3.2} onClick={(ev)=> browserHistory.push('signup')}>Signup</MenuItem>
          </NavDropdownHover>
        }
      </Nav>
    </Nav>
  );
}

const Header = (props)=> {
  return (
    <Grid id='navbar'>
      <Row>
        <Col xs={12}>
          <Navbar fixedTop fluid id='rubix-nav-header'>
            <Row>
              <Col xs={3} visible='xs'>
                <SidebarBtn />
              </Col>
              <Col xs={6} sm={4}>
                <Brand />
              </Col>
              <Col xs={3} sm={8} collapseRight className='text-right'>
                <HeaderNavigation {...props} />
              </Col>
            </Row>
          </Navbar>
        </Col>
      </Row>
    </Grid>
  );
}

export default Header