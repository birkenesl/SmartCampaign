import { Row, Col, Card, Form, Container, Image, Jumbotron} from 'react-bootstrap';
import { Link, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { create_post, fetch_post } from './api';


function photo_path(post) {
  return "http://localhost:4000/photos/" + post.photo_hash;
}

function ShowCampaign({posts, session}) {


  let params = useParams();
  let id = params.id;

  function grabPost(id) {
    for (var i = 0, len = posts.length; i < len; i++) {
      //console.log(posts[i].id);
      if (posts[i].id == id) {
        //console.log(posts[i]);
        return posts[i];
      }
    }
  }

  function Response({resp}) {
    return (
      <Row>
        <Col>
          <Card border="primary" className="text-center">
            <Card.Header>Rating: {resp.rating} / 5</Card.Header>
            <Card.Text>
              Customer: {resp.body}
            </Card.Text>
          </Card>
        </Col>
      </Row>

    );
  }

  function ListResponses() {


    let resps = post.responses.map((response) => (
      <Response resp={response} key= {response.id} />
    ));
    return (
      <div>
        {resps}
      </div>
    )
  }

  function NoResponses() {
    return (
      <div>
        <h5 className="text-center">Looks like nobody has responded yet. </h5>
      </div>
  );
  }

  function AverageRating() {

    let len = post.responses.length;
    if (len === 0) {
      return (
        <NoResponses/>
      );
    }

    let soFar = 0;
    for (var i = 0; i < len; i++) {
      soFar += post.responses[i].rating
    }
    let avg = soFar / len;
    return (
      <div>
        <h3 className="text-center">{avg} / 5</h3>
      </div>
    )
  }

  let post = grabPost(id);


  return (
    <Container>
      <Jumbotron>
        <br/>
        <h1 className="text-center">Dashboard </h1>
      </Jumbotron>
      <Row>
        <Col>
          <h3 className="text-center font-weight-bold">Campaign Title: {post.title} </h3>
          <h5 className="text-center font-weight-light">Offer: {post.offer} </h5>
          <h5 className="text-center font-weight-light">Coupon: {post.coupon} </h5>


        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h5 className="text-center">Ad:</h5>
          <Image src={photo_path(post)} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center font-weight-bold">Average Customer Rating</h4>
          <AverageRating />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center font-weight-bold">Generated WordCloud</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center font-weight-bold">Dominant Tone of Responses</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center font-weight-bold">Response Tone Graph</h4>
        </Col>
      </Row>

      <ListResponses/>

    </Container>
  )


}


export default connect(
  ({posts, session}) => ({posts, session}))(ShowCampaign);
