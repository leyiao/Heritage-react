import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from "react-bootstrap/Card";

import { AddNew } from "./AddNew";

export function AccordionForm() {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Click to add new artifacts!
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body><AddNew /></Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}