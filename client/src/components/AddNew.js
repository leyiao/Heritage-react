import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Col from "react-bootstrap/Col";

export const AddNew = () => {
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
            <Form.Group controlId="formName" style={{width: '15rem'}}>
                <Form.Label>Artifact Name</Form.Label>
                <Form.Control
                    required
                    type="name"
                    placeholder="artifact name"
                  
                />
                <Form.Control.Feedback type="invalid">
                    Artifact name is required.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Label>Date Added</Form.Label>
            <Form.Row style={{width: '45rem'}}>
                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="DD" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="MM" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control
                        required
                        type="number"
                        placeholder="YYYY"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid year.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSelectCat" style={{width: '15rem'}}>
                    <Form.Control as="select">
                        <option>Documented</option>
                        <option>Likely</option>
                        <option>Accurate</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>

    

            <Form.Label>Date Acquire</Form.Label>
            <Form.Row style={{width: '45rem'}}>
                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="DD" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control type="number" placeholder="MM" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGrid">
                    <Form.Control
                        required
                        type="number"
                        placeholder="YYYY"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid year.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formSelectCat" style={{width: '15rem'}}>
                    <Form.Control as="select">
                        <option>Documented</option>
                        <option>Likely</option>
                        <option>Accurate</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formLocation" style={{width: '15rem'}}>
                <Form.Label>Location:</Form.Label>
                <Form.Control type="text" placeholder="Location" />
            </Form.Group>         
            <Form.Group controlId="formTag" style={{width: '15rem'}}>
                <Form.Label>Enter the tag want to put for this photo</Form.Label>
                <Form.Control type="text" placeholder="tag" />
            </Form.Group>
            <Form.Group controlId="formHeir" style={{width: '15rem'}}>
                <Form.Label>Heir</Form.Label>
                <Form.Control type="text" placeholder="heir" />
            </Form.Group>

            <Form.Group controlId="formCurrentOwner" style={{width: '15rem'}}>
                <Form.Label>Current Owner</Form.Label>
                <Form.Control type="text" placeholder="current owner" />
            </Form.Group>

            <Form.Group controlId="formTextarea" style={{width: '60rem'}}>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Detailed artifact description..."/>
            </Form.Group>
            <br></br>
           
            <Button type="submit" variant="primary">Submit</Button>

        </Form>
    );
};
