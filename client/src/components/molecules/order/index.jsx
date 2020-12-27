import { Fragment, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Moment from 'moment';
import { API } from '../../../config/api';
import { RiErrorWarningLine } from 'react-icons/ri';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import Button from '../../atoms/button';

import './order.css';
import { useHistory } from 'react-router-dom';

export default function Order() {
  const [datas, setDatas] = useState([]);

  const router = useHistory();

  const transaction = async () => {
    try {
      const response = await API(`/transaction?status=my-order`);
      setDatas(response.data.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    transaction();
  }, []);

  console.log(datas);

  return (
    <Fragment>
      <div className='container'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
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
            {datas.length > 0 &&
              datas
                .sort((a, b) => b.id - a.id)
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {data.orderTo &&
                          data.orderTo.map((user) => user.fullname)}
                      </td>
                      <td>{data.title}</td>
                      <td>{Moment(data.started).format('LL')}</td>
                      <td>{Moment(data.finished).format('LL')}</td>
                      <td
                        className={
                          data.status === 'Waiting Accept'
                            ? 'text-warning'
                            : data.status === 'Success'
                            ? 'text-info'
                            : data.status === 'Cancel'
                            ? 'text-danger'
                            : data.status === 'Complete'
                            ? 'text-info'
                            : data.status === 'Confirm'
                            ? 'text-success'
                            : null
                        }
                      >
                        {data.status === 'Waiting Accept'
                          ? 'waiting Accept'
                          : data.status === 'Success'
                          ? 'On Progress...'
                          : data.status === 'Cancel'
                          ? 'Canceled'
                          : data.status === 'Complete'
                          ? 'Waiting Confirm'
                          : data.status === 'Confirm'
                          ? 'Success'
                          : null}
                      </td>
                      <td className='text-center'>
                        {data.status === 'Waiting Accept' ? (
                          <RiErrorWarningLine color='#ff9900' />
                        ) : data.status === 'Success' ? (
                          <AiOutlineCheckCircle color='#3BB54A' />
                        ) : data.status === 'Cancel' ? (
                          <FcCancel color='#red' />
                        ) : data.status === 'Complete' ? (
                          <Button
                            title='View Project'
                            className='btn-sm button-post text-white'
                            onClick={(e) =>
                              router.push(`/detail-project/${data.id}`)
                            }
                          />
                        ) : data.status === 'Confirm' ? (
                          <Button
                            title='View Project'
                            className='btn-sm button-post text-white'
                            onClick={(e) =>
                              router.push(`/detail-project/${data.id}`)
                            }
                          />
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}
