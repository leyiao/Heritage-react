import React from "react";
import ReactSearchBox from 'react-search-box'
import {Button, Form, FormControl} from "react-bootstrap";


export default class DateSelect extends React.Component {
    render() {
        return (
            <Form>
                <Form.Label>Enter a year or/and a month</Form.Label>
                <Form.Row style={{width: '30rem'}}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </Form.Group>
                </Form.Row>

                <Form.Label>Select a range</Form.Label>
                <Form.Row style={{width: '75rem'}}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="From"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="To"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </Form.Group>
                </Form.Row>


            </Form>
        )
    }

}