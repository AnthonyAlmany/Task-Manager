import React, {useState} from 'react';
import "../style/app.scss"
import PopUp from './PopUp';


// import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faFrown } from '@fortawesome/free-solid-svg-icons'




function Task(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  

    return (
      
           <div className='task-item'>
          <FontAwesomeIcon icon={props.completed ? faSmile : faFrown} color={props.completed ? "green" : "red"} size="xl" id="icon"/>
          {/* <FontAwesomeIcon icon={faFrown} size="xl" color='red' id="icon"/> */}
          <div className='task-elements'>
              <div className='task-name'>
              <h2>{props.name}</h2>
              <h4>{props.date !== null ? `Completed on: ${props.date}` : `Not completed yet`}</h4>
              </div>
          
            <button onClick={handleShow}>Complete</button>      
            {/* <button onClick = {() => props.deleteData(props.id)}> Delete </button> */}
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
             />}
           </div>

           </div>
  
    );
}

export default Task

        //    {/* <button onClick = {() => props.updateData(props.id, props.completed, props.date)}> Completed </button> */}
        //    {/* <button onClick = {() => props.deleteData(props.id)}> Delete </button> */}
        // {props.completed ? "true" : "false"},