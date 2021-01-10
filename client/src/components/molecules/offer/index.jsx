import { Fragment, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { API } from '../../../config/api';
import Button from '../../atoms/button';
import Moment from 'moment';
import { FcCancel } from 'react-icons/fc';
import { AiOutlineCheckCircle, AiOutlineLine } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import ModalPopUp from '../../atoms/modal';
import Loading from '../../atoms/loading';

export default function Offer() {
  let [datas, setDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [detail, setDetail] = useState('');

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

  const approveProject = async (e, hireId) => {
    e.preventDefault();
    console.log(e.target);
    try {
      await API.put(`/hire/${hireId}`);
      setText('accept');
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const rejectProject = async (e, hireId) => {
    e.preventDefault();
    console.log(e.target);
    try {
      await API.delete(`/hire/${hireId}`);
      setText('reject');
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handlePopUp = async (e) => {
    try {
      setShowModal(true);

      const response = await API(`/transaction/offer/${e.target.id}`);
      setDetail(response.data.data.offer);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    transaction();
  }, [text]);

  console.log(datas);

  return loading ? (
    <Loading />
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
            datas
              .sort((a, b) => b.id - a.id)
              .map((data, index) => {
                return loading ? (
                  <Loading />
                ) : (
                  <>
                    <ModalPopUp
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      title={detail.title}
                      description={detail.description}
                      price={detail.price}
                      approve={(e) => approveProject(e, detail.id)}
                      reject={(e) => rejectProject(e, detail.id)}
                    />
                    <tbody
                      style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        width: '100%',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.orderBy.map((user) => user.fullname)}</td>
                        <td
                          id={data.id}
                          style={{ cursor: 'pointer' }}
                          onClick={handlePopUp}
                        >
                          {data.title}
                        </td>
                        <td>{Moment(data.started).format('LL')}</td>
                        <td>{Moment(data.finished).format('LL')}</td>
                        <td
                          className={`text-center ${
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
                          }`}
                        >
                          {data.status === 'Waiting Accept'
                            ? 'Waiting Accept'
                            : data.status === 'Success'
                            ? 'Send a Project!'
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
                                onClick={(e) => approveProject(e, data.id)}
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
                          ) : data.status === 'Confirm' ? (
                            <AiOutlineCheckCircle color='#0ACF83' />
                          ) : data.status === 'Complete' ? (
                            <AiOutlineLine color='#17a2b8' />
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
