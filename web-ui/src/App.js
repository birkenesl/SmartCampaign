import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Nav from './Nav';
import UsersList from './Users/List';
import UsersNew from './Users/New';
import UsersNewBusiness from './Users/NewBusiness'
import PostsNew from './Posts/New';
import Feed from './Feed';

// Much of this code attributed to Nat Tuck's lecture code provided for the photo-blog-spa app

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/posts/new" exact>
          <PostsNew />
        </Route>
        <Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/users/newBusiness" exact>
          <UsersNewBusiness />
        </Route>
        <Route path="/users/new" exact>
          <UsersNew />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
