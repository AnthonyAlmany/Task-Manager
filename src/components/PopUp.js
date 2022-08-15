import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'


function PopUp(props) {


  return (
    <div>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
              <div style={{ background: "rgb(38,35,33)",  color: "#f5f6f7"  }}>
              <Modal.Header>
                 <Modal.Title>Would you like to complete the Task?</Modal.Title>
               </Modal.Header>
              <Modal.Body> {props.name}</Modal.Body>
              <Modal.Footer>
                 <Button variant="secondary" onClick={props.handleClose}>
                   Close
                 </Button>
                 <Button variant="primary" onClick={() => {props.handleClose(); props.updateData(props.id, props.completed, props.date, props.completedBy);}}>
                   Complete
                 </Button>
             </Modal.Footer>
              </div>
             </Modal>
    </div>
  )
}

export default PopUp


