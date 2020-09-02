import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap, faCalendarWeek, faImages, faSearch} from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';
import '../App.css';

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="navigationBar"
        >
          <Navbar.Brand href="/">
            <img
              alt=""
              src="../logo-long-w.png"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link style={{color: 'white'}} href="/artifacts"><FontAwesomeIcon icon={faImages} /> Artifacts</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/familytree"><FontAwesomeIcon icon={faSitemap} /> Family Tree</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/timeline"><FontAwesomeIcon icon={faCalendarWeek} /> Timeline</Nav.Link>
              <Nav.Link style={{color: 'white'}} href="/search"><FontAwesomeIcon icon={faSearch} /> Search</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
