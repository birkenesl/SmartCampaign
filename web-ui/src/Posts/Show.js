import { Row, Col, Card } from 'react-bootstrap';
import { Link, useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { create_post, fetch_post } from '../api';


function photo_path(post) {
  return "http://localhost:4000/photos/" + post.photo_hash;
}

function Show({posts, session}) {
  console.log(posts);
  let location = useLocation();
  let history = useHistory();
  console.log(location);


  function grabPost(id) {

    for (var i = 0, len = posts.length; i < len; i++) {
      if (posts[i].id === id) {
        console.log(posts[i]);
        return posts[i];
      }
    }
    return null;


  }

  let post = grabPost(location.state);
  if (post == null) {
    history.push("/feed");
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
    </div>
  )


}


export default connect(
  ({posts, session}) => ({posts, session}))(Show);
