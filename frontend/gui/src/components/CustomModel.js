import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateEmpForm from "./UpdateEmpForm";


const CustomModal = forwardRef((props, ref) => {
  const [lgShow, setLgShow] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      show: () => setLgShow(true),
      hide: () => setLgShow(false),
    }
  })
 
  return (
    <Modal
      animation={false}
      size="lg"
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    > 
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
    </Modal>
  );
})

export default CustomModal;