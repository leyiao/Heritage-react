import React, { Component } from 'react';
import { Table, Badge } from 'react-bootstrap';

class ArtifactDetail extends Component {
  render() {
    return (
      <React.Fragment>
        <Table>
          <tbody>
            <tr>
              <th className="lightGray">Date acquired:</th>
              <td>{this.props.dateAcq}</td>
              <td><h5><Badge variant="info">{this.props.accuracy}</Badge></h5></td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default ArtifactDetail;
