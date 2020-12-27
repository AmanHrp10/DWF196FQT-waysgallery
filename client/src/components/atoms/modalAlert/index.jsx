import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';

export default function ModalAlert({
  popUp,
  handlePopUp,
  className,
  text,
  size,
  background,
}) {
  return (
    <Fragment>
      <div className='modal alert' style={{ background: 'red' }}>
        <Modal
          show={popUp}
          onHide={handlePopUp}
          dialogClassName='modal-5w'
          className={className}
        >
          <p className='text-center' style={{ marginTop: '-15px' }}>
            {text}
          </p>
        </Modal>
      </div>
    </Fragment>
  );
}
