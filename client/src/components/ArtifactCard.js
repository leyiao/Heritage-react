import React from 'react';
import './ArtifactCard.css';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const ArtifactCard = props => (
  <NavLink to={props.link}>
    <Card>
      <Card.Img variant="top" src={props.img} alt="Card image" rounded fluid />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  </NavLink>
);
