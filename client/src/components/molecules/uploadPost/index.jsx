import { Fragment } from 'react';
import './uploadPost.css';
import InputForm from '../../atoms/inputForm/index';
import Textarea from '../../atoms/textAre';
import Button from '../../atoms/button';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import './uploadPost.css';

export default function UploadPost() {
  return (
    <Fragment>
      <div className='container'>
        <div className='row wrapper-upload-post mt-5'>
          <div className='col-8'>
            <div className='upload-post'>
              <div className='d-flex justify-content-center align-content-center mt-4 flex-row'>
                <AiOutlineCloudUpload size='10em' color='#e7e7e7' />
                <div style={{ position: 'absolute', top: '60%' }}>
                  <span style={{ color: ' #2FC4B2', fontWeight: 'bold' }}>
                    Brouse
                  </span>{' '}
                  to choose a file
                </div>
              </div>
            </div>
          </div>
          <div className='col-4 mt-4'>
            <InputForm title='Title' />
            <Textarea title='Description' rows='5' className='my-3' />
            <div className='d-flex justify-content-around px-5 mt-5'>
              <Button title='Cancel' className='button-cancel btn-sm px-4' />
              <Button
                title='Post'
                className='button-post btn-sm px-4 text-white'
                style={{ color: '#000' }}
              />
            </div>
          </div>
        </div>
        <div className='row wrapper-upload-post mt-3'>
          <div className='col-8'>
            <div className='upload-post-child'>
              <div className='row'>
                <div className='col-3'>
                  <div className='image-post'>
                    <div className='d-flex justify-content-center'>
                      <FiPlus size='5em' color='#e7e7e7' />
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='image-post'>
                    <div className='d-flex justify-content-center'>
                      <FiPlus size='5em' color='#e7e7e7' />
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='image-post'>
                    <div className='d-flex justify-content-center'>
                      <FiPlus size='5em' color='#e7e7e7' />
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <div className='image-post'>
                    <div className='d-flex justify-content-center'>
                      <FiPlus size='5em' color='#e7e7e7' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
