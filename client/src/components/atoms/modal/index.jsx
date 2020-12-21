import { Fragment } from 'react';
import { Modal } from 'react-bootstrap';

export default function ModalPopUp(props) {
  return (
    <Fragment>
      <Modal {...props} size='lg'>
        <Modal.Title style={{ color: '' }}>{props.title}</Modal.Title>
        <Modal.Body>{props.body}</Modal.Body>
      </Modal>
    </Fragment>
  );
}
