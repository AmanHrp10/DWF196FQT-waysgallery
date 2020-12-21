import { Fragment, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { API } from '../../../config/api';
import Button from '../../atoms/button';
import Moment from 'moment';
import { FcCancel } from 'react-icons/fc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ModalPopUp from '../../atoms/modal';

export default function Offer() {
  let [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');

  const router = useHistory();

  const transaction = async () => {
    try {
      setLoading(true);
      const response = await API('/transaction?status=my-offer');
      setDatas(response.data.data.orders);
      console.log('transaction');
      setLoading(false);
      setText('render');
      console.log(loading);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const acceptProject = async (e, id) => {
    e.preventDefault();
    try {
      await API.put(`/hire/${id}`);
      console.log('accept');
      setText('accept');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const rejectProject = async (e, id) => {
    e.preventDefault();
    try {
      await API.delete(`/hire/${id}`);
      console.log('reject');
      setText('reject');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    transaction();
  }, [text]);

  return loading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <div className='container'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <th>No</th>
              <th>Client</th>
              <th>Order</th>
              <th>Start Project</th>
              <th>End Project</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {datas.length > 0 &&
            datas.map((data, index) => {
              return loading ? (
                <Skeleton />
              ) : (
                <>
                  <ModalPopUp
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={data.title}
                    body={data.description}
                  />
                  <tbody
                    key={index}
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '100%',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.orderBy.map((user) => user.fullname)}</td>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowModal(true)}
                      >
                        {data.title}
                      </td>
                      <td>{Moment(data.started).format('LL')}</td>
                      <td>{Moment(data.finished).format('LL')}</td>
                      <td
                        className={
                          data.status === 'Waiting Accept'
                            ? 'text-warning'
                            : data.status === 'Success'
                            ? 'text-success'
                            : data.status === 'Cancel'
                            ? 'text-danger'
                            : data.status === 'Complete'
                            ? 'text-success'
                            : null
                        }
                      >
                        {data.status}
                      </td>
                      <td className='text-center'>
                        {data.status === 'Waiting Accept' ? (
                          <div className='d-flex justify-content-center'>
                            <Button
                              title='Cancel'
                              className='btn-sm text-white'
                              style={{ background: 'red' }}
                              onClick={(e) => rejectProject(e, data.id)}
                            />
                            <Button
                              title='Approve'
                              className='btn-sm text-white ml-3'
                              style={{ background: '#0ACF83' }}
                              onClick={(e) => acceptProject(e, data.id)}
                            />
                          </div>
                        ) : data.status === 'Success' ? (
                          <Button
                            title='Send Project'
                            className='btn-sm button-post text-white'
                            onClick={() =>
                              router.push(`/upload-project/${data.id}`)
                            }
                          />
                        ) : data.status === 'Cancel' ? (
                          <FcCancel color='#red' />
                        ) : data.status === 'Complete' ? (
                          <AiOutlineCheckCircle color='#0ACF83' />
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </Table>
      </div>
    </Fragment>
  );
}
