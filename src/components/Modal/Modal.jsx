import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalForm(props) {
  console.log(props.value);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      dialogClassName="modal-50w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.value}
      </Modal.Body>
    </Modal>
  );
}

export default ModalForm;
