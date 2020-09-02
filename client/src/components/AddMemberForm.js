import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Col from "react-bootstrap/Col";

export const AddMemberForm =() => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row style={{width: '35rem'}}>
                <Form.Group as={Col} controlId="formGridText">
                    <h6>Add a parent/child to family tree</h6>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCheckbox">
                    <Form.Control as="select">
                        <option>Parent</option>
                        <option>Child</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>

            <Form.Label>Name</Form.Label>
            <Form.Row style={{width: '35rem'}}>
                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control required type="name" placeholder="First name"/>
                    <Form.Control.Feedback type="invalid">
                        First name is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control required type="name" placeholder="Last name"/>
                    <Form.Control.Feedback type="invalid">
                        Last name is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="name" placeholder="Maiden name"/>
                </Form.Group>
            </Form.Row>

            <Form.Label>Date of Birth</Form.Label>
            <Form.Row style={{width: '30rem'}}>
                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="DD"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="MM"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="YYYY"/>
                </Form.Group>
            </Form.Row>

            <Form.Label>Date of Death</Form.Label>
            <Form.Row style={{width: '30rem'}}>
                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="DD"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="MM"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="YYYY"/>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formSelectCat" style={{width: '15rem'}}>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </Form.Control>
            </Form.Group>

            <Button type="upload" variant="primary">Upload User Profile</Button>
            <br />
            <Button type="submit" variant="primary">Submit</Button>

        </Form>

    )
}
