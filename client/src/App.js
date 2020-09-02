import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './layouts/Home';
import Timeline from './layouts/Timeline';
import FamilyTree from './layouts/FamilyTree';
import Artifacts from './layouts/Artifacts';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Photos from './layouts/Photos';
import Physical from './layouts/Physical';
import Letters from './layouts/Letters';
import Postcard from './layouts/Postcard';

import Form from './layouts/Form';
import Search from './layouts/Search';
import AddNewRoute from './layouts/AddNewRoute';
import Errorpage from './layouts/Errorpage';
import NotFound from './layouts/NotFound';

import ScrollToTop from './ScrollToTop';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ minHeight: '97.5vh' }}>
          <Router>
            <ScrollToTop />
            <NavigationBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/timeline" component={Timeline} />
              <Route path="/familytree" component={FamilyTree} />
              <Route path="/artifacts/" component={Artifacts} />
              <Route path="/photos/:id" component={Photos} />
              <Route path="/postcard/:id" component={Postcard} />
              <Route path="/letters/:id" component={Letters} />
              <Route path="/physical/:id" component={Physical} />
              <Route path="/form" component={Form} />
              <Route path="/search" component={Search} />
              <Route path="/add-new" component={AddNewRoute} />
              <Route path="/error" component={Errorpage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
