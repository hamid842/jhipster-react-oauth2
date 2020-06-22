import React from 'react';
import { Table } from 'react-bootstrap';

const table = () => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr style={{ background: '#7371ea', color: '#ffffff' }} className="text-center">
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Email</th>
          <th>Nationality</th>
          <th>State</th>
          <th>City</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
      </tbody>
    </Table>
  );
};

export default table;
