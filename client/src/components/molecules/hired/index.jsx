import { Fragment } from 'react';
import InputForm from '../../atoms/inputForm/index';
import Textarea from '../../atoms/textArea';
import Button from '../../atoms/button/index';
import './hired.css';

export default function HirePost() {
  return (
    <Fragment>
      <div className='container ' style={{ marginTop: '110px' }}>
        <div className='wrapper-hired-post'>
          <InputForm title='Title' type='text' />
          <Textarea title='Description' className='my-3' rows='7' />
          <div className='row'>
            <div className='col-6'>
              <InputForm title='Start Project' type='date' />
            </div>

            <div className='col-6'>
              <InputForm title='End Project' type='date' />
            </div>
          </div>
          <InputForm title='Price' type='number' className='my-3' />

          <div
            className='button-hire d-flex justify-content-around mt-4'
            style={{ padding: '0 250px' }}
          >
            <Button title='Cancel' className='button-cancel btn-sm px-4' />
            <Button
              title='Bidding'
              className='button-post px-4 btn-sm text-white'
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
