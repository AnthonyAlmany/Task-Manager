import React, {useState} from 'react';
import "../style/app.scss"
import PopUp from './PopUp';


import { Popover, OverlayTrigger } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faFrown } from '@fortawesome/free-solid-svg-icons'




function Task(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const popover = (
      <Popover className='popover' id="popover-basic">
        <Popover.Header className='"popover-header' as="h4">No name selected</Popover.Header>
        <Popover.Body className='"popover-body'>
          Select your employee's name to complete the task.
        </Popover.Body>
      </Popover>
    );
  
    const noPopover = (
      <Popover id="popover-custom"></Popover>
   );

    return (
      
           <div className='task-item'>
          <FontAwesomeIcon icon={props.completed ? faSmile : faFrown} color={props.completed ? "green" : "red"} id="icon"/>
     
          <div className='task-elements'>
              <div className='task-name'>
              <h2>{props.name}</h2>
              <h4 id="completed">{props.date !== undefined ? `Completed on: ${props.date} by ${props.completedBy}` : `Not completed yet`}</h4>
              </div>
          
              <OverlayTrigger trigger="click" placement="bottom" overlay={props.selectValue === "Select Name" ? popover : noPopover}  rootClose={true} >
            <button  onClick={() => props.selectValue !== "Select Name" && handleShow()}>Complete</button>     
              </OverlayTrigger> 
               
          </div>

           <div>
            {show && <PopUp
             show={show} 
             handleClose={handleClose} 
             name = {props.name}
             updateData = {props.updateData}
             id = {props.id}
             completed = {props.completed}
             date = {props.date}   
             completedBy = {props.completedBy}
             />}
           </div>

           </div>
  
    );
}

export default Task

        //    {/* <button onClick = {() => props.updateData(props.id, props.completed, props.date)}> Completed </button> */}
        //    {/* <button onClick = {() => props.deleteData(props.id)}> Delete </button> */}
        // {props.completed ? "true" : "false"},
