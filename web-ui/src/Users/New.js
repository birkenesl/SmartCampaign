import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pick from 'lodash/pick';

import { create_user, fetch_users, fetch_posts, api_login} from '../api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

function UsersNew() {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "", business: false, age: "Under 20", gender: "Male", education: "No Schooling Completed", employment: "Employed", income: "Less than $20,000", pass1: "", pass2: "",
  });

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(user);

    let data = pick(user, ['name', 'email', 'business', 'password', 'age', 'gender', 'education', 'employment', 'income']);
    create_user(data).then(() => {
      fetch_users();
      fetch_posts();
      api_login(user.email, user.password).then(() => {
        history.push("/");
      });
    });
  }

  function check_pass(p1, p2) {
    // This is for user experience only,
    // validation logic goes on the server.
    if (p1 !== p2) {
      return "Passwords don't match.";
    }

    if (p1.length < 8) {
      return "Password too short.";
    }

    return "";
  }

  function check_name(nm) {
    if (nm == "") {
      return "Name can't be blank."
    }

    return "";
  }


  function check_email(nm) {
    if (nm == "") {
      return "Email can't be blank."
    }

    return "";
  }

  function update(field, ev) {
    let u1 = Object.assign({}, user);
    u1[field] = ev.target.value;
    u1.password = u1.pass1;
    u1.pass_msg = check_pass(u1.pass1, u1.pass2);
    u1.name_msg = check_name(u1.name)
    u1.email_msg = check_email(u1.email)
    setUser(u1);
  }

  return (
    <div>
      <br/>
      <h2 class="text-center"> Ready to start earning some coupons? </h2>
      <h6 class="text-center font-italic">
        Enter in some quick demographic information below. Using this, businesses can send you relevant ad campaigns.
      </h6>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"
                        onChange={
                          (ev) => update("name", ev)}
            value={user.name} />
          <p>{user.name_msg}</p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text"
                        onChange={
                          (ev) => update("email", ev)}
            value={user.email} />
          <p>{user.email_msg}</p>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select your Age:</Form.Label>
          <Form.Control as="select" onChange={
            (ev) => update("age", ev)}>
            <option>Under 20</option>
            <option>20-29</option>
            <option>30-39</option>
            <option>40-49</option>
            <option>50-59</option>
            <option>60-69</option>
            <option>70 and Over</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select your Gender:</Form.Label>
          <Form.Control as="select" onChange={
            (ev) => update("gender", ev)}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select your Level of Education:</Form.Label>
          <Form.Control as="select" onChange={
            (ev) => update("education", ev)}>
            <option>No Schooling Completed</option>
            <option>Middle School Completed</option>
            <option>Some High School Completed</option>
            <option>High School Graduate</option>
            <option>Some College</option>
            <option>Associate's Degree</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Doctoral Degree</option>
            <option>Professional Degree</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select your Employment Status:</Form.Label>
          <Form.Control as="select" onChange={
            (ev) => update("employment", ev)}>
            <option>Employed</option>
            <option>Self-Employed</option>
            <option>Unemployed</option>
            <option>Student</option>
            <option>Retired</option>
            <option>Military</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select your Income Level:</Form.Label>
          <Form.Control as="select" onChange={
            (ev) => update("income", ev)}>
            <option>Less than $20,000</option>
            <option>$20,000 to $49,999</option>
            <option>$50,000 to $74,999</option>
            <option>$75,000 to $99,999</option>
            <option>$100,000 to $199,999</option>
            <option>Over $200,000</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
            onChange={
              (ev) => update("pass1", ev)}
            value={user.pass1} />
          <p>{user.pass_msg}</p>

        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password"
            onChange={
              (ev) => update("pass2", ev)}
            value={user.pass2} />
        </Form.Group>
        <Button variant="primary" type="submit"
                disabled={user.pass_msg !== "" || user.name_msg != ""}>
          Save
        </Button>
      </Form>
    </div>
  );
}

function state2props(_state) {
  return {};
}

export default connect(state2props)(UsersNew);
