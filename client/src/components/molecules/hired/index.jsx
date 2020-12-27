import { Fragment, useState } from 'react';
import InputForm from '../../atoms/inputForm/index';
import Textarea from '../../atoms/textArea';
import Button from '../../atoms/button/index';
import './hired.css';
import { API } from '../../../config/api';
import { useParams, useHistory } from 'react-router-dom';
import Moment from 'moment';

export default function HirePost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    started: '',
    finished: '',
    price: '',
  });

  const dateStart = Moment(formData.started).format();
  const dateFinish = Moment(formData.finished).format();

  const { title, description, price } = formData;
  const { id } = useParams();
  const router = useHistory();

  const handleAdd = async (e) => {
    e.preventDefault();

    let body = formData;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log(body);
      const response = await API.post(
        `/hire/${id}`,
        {
          ...body,
          started: dateStart,
          finished: dateFinish,
        },
        config
      );
      setFormData(response.data.data.hire);

      setFormData({
        title: '',
        description: '',
        started: '',
        finished: '',
        price: '',
      });

      router.push('/transaction');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      started: '',
      finished: '',
      price: '',
    });
  };

  return (
    <Fragment>
      <div className='container ' style={{ marginTop: '110px' }}>
        <div className='wrapper-hired-post'>
          <InputForm
            title='Title'
            type='text'
            name='title'
            value={title}
            onChange={(e) => handleChange(e)}
          />
          <Textarea
            title='Description'
            name='description'
            className='my-3'
            rows='7'
            value={description}
            onChange={(e) => handleChange(e)}
          />
          <div className='row'>
            <div className='col-6'>
              <InputForm
                name='started'
                title='Start Project'
                type='date'
                onChange={(e) => handleChange(e)}
                // value={Moment(dateStart).format('LL')}
              />
            </div>

            <div className='col-6'>
              <InputForm
                title='date'
                label='End Project'
                type='date'
                name='finished'
                // value={Moment(dateFinish).format('LL')}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <InputForm
            title='Price'
            type='number'
            className='my-3'
            value={price}
            onChange={(e) => handleChange(e)}
            name='price'
          />

          <div
            className='button-hire d-flex justify-content-around mt-4'
            style={{ padding: '0 250px' }}
          >
            <Button
              title='Cancel'
              className='button-cancel btn-sm px-4'
              onClick={handleCancel}
            />
            <Button
              title='Bidding'
              className='button-post px-4 btn-sm text-white'
              onClick={(e) => handleAdd(e)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
