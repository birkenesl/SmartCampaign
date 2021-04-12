import { Nav, Row, Col, Form, Navbar, Container,
         Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { api_login } from './api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app



let SessionInfo = connect()(({session, dispatch}) => {
  function logout() {

    dispatch({type: 'session/clear'});

  }
  return (
    <Navbar.Text>
      <p className="color-white">
        Logged in as {session.name} &nbsp;
        <Button  onClick={logout}>Logout</Button>
      </p>
    </Navbar.Text>
  );
});

function LOI({session}) {

  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return (
      <Nav className="mr-auto">
        <Link to="/login">Login</Link>
      </Nav>
    )
  }
}

const LoginOrInfo = connect(
  ({session}) => ({session}))(LOI);

function Link({to, children}) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link"
               activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}


function RL({session}) {

  if (session) {

    if (session.business == true) {
      return (
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/feed">Campaigns</Link>
        </Nav>
      );
    }
    else {
      return ( // TODO: change one of these feed links. Or replace home with /
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/feed">Feed</Link>
        </Nav>
      );
    }

  }
  else {
    return (
      <Nav className="mr-auto">
        <Link to="/">Home</Link>
        <Link to="/users/newBusiness">Register as a Business</Link>
        <Link to="/users/new">Register as a Customer</Link>
      </Nav>

    );
  }



}

const RelevantLinks = connect(
  ({session}) => ({session}))(RL);

function AppNav({error}) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>

            <Navbar className = "sticky-nav" variant="dark">
              <Container>
                <Navbar.Brand>SmartCampaign</Navbar.Brand>
                <RelevantLinks />

                <LoginOrInfo />
              </Container>
            </Navbar>

        </Col>
      </Row>
      { error_row }
    </div>
  );
}

export default connect(({error}) => ({error}))(AppNav);
