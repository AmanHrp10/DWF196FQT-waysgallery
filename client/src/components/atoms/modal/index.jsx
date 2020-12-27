import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '../button';

export default function ModalPopUp({
  index,
  title,
  description,
  price,
  onHide,
  approve,
  reject,
  id,
  show,
}) {
  return (
    <Fragment>
      <Modal show={show} onHide={onHide} size='lg' index={index}>
        <div className='text'>
          <p style={{ fontFamily: 'sans-serif' }}>
            <p className='my-3' style={{ fontFamily: 'sans-serif' }}>
              {title}
            </p>
            {description}
          </p>
          <p
            style={{
              fontWeight: 'bold',
              color: '#80b918',
              fontFamily: 'sans-serif',
            }}
          >
            {price}
          </p>
        </div>
        <div className='button-modal d-flex justify-content-end'>
          <Button
            id={id}
            title='Confirm'
            className='button-post text-white btn-sm mr-3'
            onClick={approve}
          />
          <Button
            id={id}
            title='Cancel'
            className='button-danger btn-sm text-white'
            onClick={reject}
          />
        </div>
      </Modal>
    </Fragment>
  );
}
