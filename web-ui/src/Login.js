import { Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import { api_login } from './api';
import { connect } from 'react-redux';

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(name, pass);
  }

  return (
    <Form onSubmit={on_submit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control name="name"
                      type="text"
                      onChange={(ev) => setName(ev.target.value)}
                      value={name} />

        <Form.Label>Password</Form.Label>
        <Form.Control name="password"
                      type="password"
                      onChange={(ev) => setPass(ev.target.value)}
                      value={pass} />
        <Button variant="dark" type="submit">
          Login
        </Button>
      </Form.Group>
    </Form>
  );
}
export default connect(
  ({session}) => ({session}))(Login);
