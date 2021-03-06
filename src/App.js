import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// 1. Add dependencies
import { 
  BrowserRouter as Router, 
  Route,
  Link,
  Switch,
  NavLink } from 'react-router-dom';

const Home = () => (
  <div>
    <h4>Home</h4>
  </div>
)

const About = (props) => {
  // Check props to see what is added by the router.
  console.log(props);
  return (
    <div>
      <h4>About</h4>
    </div>
  )
};

const Topics = ({ match }) => (
  <div>
    <h4>Example Projects</h4>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const NotFound = () => (
  <div>
    <h3>404</h3>
    {/* This does server refresh, so no! */}
    <a href="/">Home via anchor</a><br />
    {/* Do this instead, yes! */}
    <Link to="/">Home via Link</Link>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        {/* Outside the Switch, content added to every page */}
        <div>
          <nav class="navbar navbar-dark bg-dark">
            {/* <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li> */}
            <NavLink to="/" activeClassName="is-active" exact>Home</NavLink>
            <NavLink to="/about" activeClassName="is-active">About</NavLink>
            <NavLink to="/examples" activeClassName="is-active">Examples</NavLink>
          </nav>
          <ol class="breadcrumb">
          <NavLink to="/" activeClassName="is-active" exact><li>Home /&nbsp;</li></NavLink>
          <NavLink to="/about" activeClassName="is-active"><li>&nbsp;About /&nbsp;</li></NavLink>
          <NavLink to="/examples" activeClassName="is-active"><li>&nbsp;Examples</li></NavLink>
        </ol>
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/examples" component={Topics} />
            {/* Without a path, always a match */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
