import { Row, Col, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app


function photo_path(post) {
  return "http://localhost:4000/photos/" + post.photo_hash;
}

function Post({post}) { // to be seen by customers
  return (
        <Col md="4">
          <Card border="dark" className="text-center">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Ad by {post.user.name}</Card.Subtitle>
              <Card.Text>
                Promotional Offer: {post.offer}
              </Card.Text>
              <Card.Text>
                <Link to={`/posts/${post.id}`}>Respond</Link>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={photo_path(post)} />
            <br/>
          </Card>
        </Col>
  );
}

function Campaign({post}) { // campaigns belonging to the current business user
  return (
    <Col md="3">
      <Card border="primary" className="text-center">
        <Card.Header>Campaign: {post.title}</Card.Header>
        <Card.Img variant="bottom" src={photo_path(post)} />
      </Card>
    </Col>
  );



}


function getRelevantPosts({posts, session}) {

  function check(post) {

    let properties = ["age", "gender", "education", "employment", "income"];

    if (post.age !== "Any" && post.age !== session.age) {
      return false;
    }
    if (post.gender !== "Any" && post.gender !== session.gender) {
      return false;
    }
    if (post.education !== "Any" && post.education !== session.education) {
      return false;
    }
    if (post.employment !== "Any" && post.employment !== session.employment) {
      return false;
    }
    if (post.income !== "Any" && post.income !== session.income) {
      return false;
    }


    return true;



  }

  // basically, we store all user fields in the session now. (except for pwd)
  // We need to filter by all posts (campaigns, really) that match our session fields (age, gender, etc)
  // the reason we do this instead of having every post have a list of user ids, is so that if
  // a customer account is created after a campaign is launched, it can still see it. If we associated
  // users when the campaign was posted, this wouldn't be the case.
  //console.log(posts);
  const relevantPosts = posts.filter(check);
  return relevantPosts;
}

function getBusinessCampaigns({posts, session}) {

  function owner(post) {
    return post.user.id === session.user_id;
  }
  const businessCampaigns = posts.filter(owner);
  return businessCampaigns;




}

function Feed({posts, session}) {

  console.log(posts);
  let history = useHistory();

  if (session) {
    // feed is entirely different if the logged in user is a business account or not.
    // if the user is a business account, we want to display all of their campaigns that they
    // created. If the user is a customer account, we want to display all campaigns that
    // target them.
    if (session.business) {
      let rel = getBusinessCampaigns({posts, session});
      let cards = rel.map((post) => (
        <Campaign post={post} key={post.id} />
      ));
      return (
        <div>
          <h2 className="text-center">Your Campaigns</h2>
          <p><Link to="/posts/new">Launch a New Campaign</Link></p>
          <Row>{cards}</Row>
        </div>
      );
    }
    else {
      let rel = getRelevantPosts({posts, session});
      let cards = rel.map((post) => (
        <Post post={post} key={post.id} />
      ));
      return (
        <div>
          <h2 className="text-center">Your Available Surveys</h2>
          <Container>
            <Row className="text-center">{cards}</Row>
          </Container>
        </div>
      );
    }


  }
  else { // users shouldn't be able to get here if they aren't logged in.
    // so let's redirect them to the login page.
    history.push("/");
    return (
      <div>
      </div>
    )


  }

}

export default connect(
  ({posts, session}) => ({posts, session}))(Feed);
