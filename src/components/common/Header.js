import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import {
  signOut
} from '../../helpers/Auth'
import {
  syncUserTodos
} from '../../helpers/TodoStorage'
import {
  SidebarBtn, Navbar, Nav, NavItem,
  Icon, Grid, Row, Col
} from '@sketchpixy/rubix';

const getPath = (path)=> `/${path}`

const logOut = ()=> {
  signOut()
  .then(()=> {
    alert("See you soon!")
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

const DirectNavItem = (props)=> {
  var active = false;
  var currentLocation = props.location.pathname;

  if(!active && props.path) {
    active = (currentLocation === props.path);
  }

  var classes = classNames({
    'pressed': active
  }, props.className);

  return (
    <NavItem className={classes} style={props.style} href={props.path} to={props.path} componentClass={Link}>
      <Icon bundle={props.bundle || 'fontello'} glyph={props.glyph} />
    </NavItem>
  );
}

const HeaderNavigation = (props)=> {
  return (
    <Nav pullRight>
      <Nav className='hidden-xs'>
        <NavItem divider />
        <NavItem href='#' onClick={(ev)=> syncTodods(props.user)}>
          <Icon bundle='fontello' glyph='arrows-cw' />
        </NavItem>
        <NavItem divider />
        {props.user &&
          <NavItem href='#' onClick={(ev)=> logOut()}>
            <Icon bundle='fontello' glyph='off-1' />
          </NavItem>
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