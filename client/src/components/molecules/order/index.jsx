import { Fragment } from 'react';
import { Table } from 'react-bootstrap';

export default function Order() {
  return (
    <Fragment>
      <div className='container'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Vendor</th>
              <th>Order</th>
              <th>Start Project</th>
              <th>End Project</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Amanudin Harahap</td>
              <td>Make a waysGallery</td>
              <td>13 Desember 2020</td>
              <td>20 Desember 2020</td>
              <td>Pending</td>
              <td>Oke</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}
