import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Some of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app


function photo_path(post) {
  return "http://smartcampaign.skyflume.com/photos/" + post.photo_hash;
}

function Post({post}) {
  return (
    <Col md="3">
      <Card>
        <Card.Img variant="top" src={photo_path(post)} />
        <Card.Text>
          Posted by {post.user.name} <br/>
          {post.body}
        </Card.Text>
      </Card>
    </Col>
  );
}

function Feed({posts, session}) {
  let cards = posts.map((post) => (
    <Post post={post} key={post.id} />
  ));

  let new_link = null;
  if (session) {
    new_link = (
      <p><Link to="/posts/new">New Campaign</Link></p>
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
