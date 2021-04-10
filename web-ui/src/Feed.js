import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app


function photo_path(post) {
  return "http://localhost:4000/photos/" + post.photo_hash;
}

function Post({post}) {
  return (
    <Col md="3">
      <Card>
        <Card.Img variant="top" src={photo_path(post)} />
        <Card.Text>
          Posted by {post.user.name} <br/>
          {post.offer}
        </Card.Text>
      </Card>
    </Col>
  );
}

function Feed({posts, session}) {
  let history = useHistory();

  if (session) {
    // feed is entirely different if the logged in user is a business account or not.
    // if the user is a business account, we want to display all of their campaigns that they
    // created. If the user is a customer account, we want to display all campaigns that
    // target them.
    if (session.business) {

    }
    else {

    }


  }
  else { // users shouldn't be able to get here if they aren't logged in.
    // so let's redirect them to the login page.
    history.push("/login");

  }


  let cards = posts.map((post) => (
    <Post post={post} key={post.id} />
  ));

  let new_link = null;
  if (session) {
    new_link = (
      <p><Link to="/posts/new">New Post</Link></p>
    )
  }

  return (
    <div>
      <h2>Feed</h2>
      { new_link }
      <Row>{cards}</Row>
    </div>
  );
}

export default connect(
  ({posts, session}) => ({posts, session}))(Feed);
