import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_post,  fetch_posts } from '../api';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

export default function PostsNew() {
  let history = useHistory();
  let [post, setPost] = useState({
    title: "", offer: "", photo: "", coupon: "", age: "Any", gender: "Any", education: "Any", employment: "Any", income: "Any",
  });

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(post);
    create_post(post).then((resp) => {
      console.log(resp);
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        fetch_posts();
        history.push("/feed");

      }
    });
  }

  function check_fields(title, offer, coupon, photo) {
    if (title == "" || offer == "" || coupon == "" || photo == "") {
      return "Please make sure all fields are filled out below."
    }
    else {
      return "";
    }

  }

  function updatePhoto(ev) {
    let p1 = Object.assign({}, post);
    p1["photo"] = ev.target.files[0];
    setPost(p1);
    p1.msg = check_fields(p1.title, p1.offer, p1.coupon, p1.photo);
  }


  function update(field, ev) {
    let p1 = Object.assign({}, post);
    p1[field] = ev.target.value;
    setPost(p1)
    p1.msg = check_fields(p1.title, p1.offer, p1.coupon, p1.photo);
  }

  return (
    <Row>
      <Col>
        <h2>New Campaign</h2>
        <Form onSubmit={submit}>
          <p>{post.msg}</p>
          <Form.Group>
            <Form.Label>Give Your Campaign a Title</Form.Label>
            <Form.Control
                          rows={4}
                          onChange={
                            (ev) => update("title", ev)}
                          value={post.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter a Promotional Offer to Incentivize Customers</Form.Label>
            <Form.Control
                          rows={4}
                          onChange={
                            (ev) => update("offer", ev)}
                          value={post.offer} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Promotional Coupon (customers will only receive this after a successful response) </Form.Label>
            <Form.Control
                          rows={4}
                          onChange={
                            (ev) => update("coupon", ev)}
                          value={post.coupon} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Your Ad</Form.Label>
            <Form.Control type="file"
                          onChange={updatePhoto} />
          </Form.Group>
          <h4> Choose some demographics to filter your target audience by: </h4>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Filter by an Age Group:</Form.Label>
            <Form.Control as="select" onChange={
              (ev) => update("age", ev)}>
              <option>Any</option>
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
            <Form.Label>Filter by Gender:</Form.Label>
            <Form.Control as="select" onChange={
              (ev) => update("gender", ev)}>
              <option>Any</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Filter by Education Group:</Form.Label>
            <Form.Control as="select" onChange={
              (ev) => update("education", ev)}>
              <option>Any</option>
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
            <Form.Label>Filter by Employment Status:</Form.Label>
            <Form.Control as="select" onChange={
              (ev) => update("employment", ev)}>
              <option>Any</option>
              <option>Employed</option>
              <option>Self-Employed</option>
              <option>Unemployed</option>
              <option>Student</option>
              <option>Retired</option>
              <option>Military</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Filter by Income Level:</Form.Label>
            <Form.Control as="select" onChange={
              (ev) => update("income", ev)}>
              <option>Any</option>
              <option>Less than $20,000</option>
              <option>$20,000 to $49,999</option>
              <option>$50,000 to $74,999</option>
              <option>$75,000 to $99,999</option>
              <option>$100,000 to $199,999</option>
              <option>Over $200,000</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit"
                  disabled={post.msg !== ""}>
            Launch!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
