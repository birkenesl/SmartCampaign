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
            Ready to start testing ad campaigns? Head on over to the Campaigns tab above.
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
            Ready to start some surveys? Head on over to the Feed tab above to see what's available.
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
            Please register for a customer or business account above.


          </h4>
          <br/>
          <br/>
          <h4 class="text-center">
          As a business, receive hidden insight into how customers respond to
          your ad - with the use of IBM Watson's Tone Analyzer API.
          </h4>
        </Jumbotron>

      </div>
    );
  }


}

export default connect(
  ({session}) => ({session}))(Home);
