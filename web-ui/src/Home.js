import { Row, Col, Card, Jumbotron} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



function Home({session}) {

  let new_link = null;

  if (session) {

    if (session.business) {
      return (
        <div>
          <br/>
          <h2 class="text-center">Hello, {session.name}</h2>
          <h4 class="text-center font-italic">
            Ready to start testing ad campaigns?
          </h4>
        </div>
      );

    }
    else {
      return (
        <div>
          <br/>
          <h2 class="text-center">Hello, {session.name}</h2>
          <h4 class="text-center font-italic">
            Ready to start some surveys?
          </h4>
        </div>
      );
    }


  }
  else {
    return (
      <div>
        <Jumbotron>
          <br/>
          <h2 class="text-center">Welcome to CampaignSmart!</h2>
          <h4 class="text-center font-italic">
            Blah blah blah blah blah landing page
          </h4>
        </Jumbotron>

      </div>
    );
  }


}

export default connect(
  ({session}) => ({session}))(Home);