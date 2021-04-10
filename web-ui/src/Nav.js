import { Nav, Row, Col, Form, Navbar, Container,
         Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';

import { api_login } from './api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

function LoginForm() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(name, pass);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control name="name"
                    type="text"
                    onChange={(ev) => setName(ev.target.value)}
                    value={name} />
      <Form.Control name="password"
                    type="password"
                    onChange={(ev) => setPass(ev.target.value)}
                    value={pass} />
      <Button variant="dark" type="submit">
        Login
      </Button>
    </Form>
  );
}

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
          <Link to="/home">Home</Link>
          <Link to="/">Feed</Link>
        </Nav>
      );
    }
    else {
      return ( // TODO: change one of these feed links. Or replace home with /
        <Nav className="mr-auto">
          <Link to="/home">Home</Link>
          <Link to="/">Feed</Link>
        </Nav>
      );
    }

  }
  else {
    return (
      <Nav className="mr-auto">
        <Link to="/home">Home</Link>
        <Link to="/users/newBusiness">Register as a Business</Link>
        <Link to="/users/new">Register as a Respondent</Link>
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

            <Navbar className = "color-nav" variant="dark">
              <Navbar.Brand> CampaignSmart</Navbar.Brand>
              <Container>
                <RelevantLinks />
              </Container>
              <Container>
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
