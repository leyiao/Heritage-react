import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import { TreeNode } from './TreeNode';

class Profile extends Component {
    constructor(...args) {
		super(...args);
		this.attachRef = target => this.setState({ target });
		this.state = { show: false };
	}
	render() {
		const { show, target } = this.state;
		return (
			<>
				<Button
					ref={this.attachRef}
					onClick={() => this.setState({ show: !show })}
				>
					Click me!
                </Button>
				<Overlay target={target} show={show} placement="right">
					{props => (
						<Tooltip id="overlay-example" {...props}>
							My Tooltip
                        </Tooltip>
					)}
				</Overlay>
			</>
		);
	}
}
export default Profile;
