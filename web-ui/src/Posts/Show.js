import { Row, Col, Card, Form } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { create_post, fetch_posts, fetch_users } from '../api';


function photo_path(post) {
  return "http://localhost:4000/photos/" + post.photo_hash;
}

function Show({posts, session}) {





  let params = useParams();
  let id = params.id;

  function grabPost(id) {
    for (var i = 0, len = posts.length; i < len; i++) {
      console.log(posts[i].id);
      if (posts[i].id == id) {
        console.log(posts[i]);
        return posts[i];
      }
    }
  }

  let post = grabPost(id);

  const [resp, setResp] = useState({
    body: "", rating: 1,
  });

  function onSubmit() {

  }

  function check_fields(body) {
    if (body.length < 100) {
      return "(Aim for at least 3 medium sized sentences)"
    }
    else {
      return "";
    }

  }


  function update(field, ev) {
    let u1 = Object.assign({}, resp);
    u1[field] = ev.target.value;

    u1.msg = check_fields(body);
    setUser(u1);
  }

  return (
    <div>
      <Col md="4">
        <Card border="dark" className="text-center">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Ad by {post.user.name}</Card.Subtitle>
            <Card.Text>
              Promotional Offer: {post.offer}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={photo_path(post)} />
          <br/>
        </Card>
      </Col>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Write a couple sentences on what you think/feel about this ad.
          Be honest, and it's okay to be critical!</Form.Label>
          <Form.Control type="text"
                        as="textarea"
                        onChange={
                          (ev) => update("body", ev)}
            value={resp.body} />
        </Form.Group>
        <p>{resp.msg}</p>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Please rate your opinion of the ad out of 5.</Form.Label>
          <Form.Control as="select" onChange={
            (ev) => update("rating", ev)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>


        <Button variant="primary" type="submit"
                disabled={resp.msg !== ""}>
          Submit response
        </Button>
      </Form>
    </div>

  );


}


export default connect(
  ({posts, session}) => ({posts, session}))(Show);
