import React from 'react';
import "../style/app.scss"

function Task(props) {

    return (
      
           <div className='task' onClick={() => props.clickHandler()}>
           <h2>{props.name}, {props.completed ? "true" : "false"}, <span>{props.date !== null ? `Completed on: ${props.date}` : `Not completed yet`}</span></h2>
           <div>
           <button onClick = {() => props.updateData(props.id, props.completed, props.date, true)}> Completed </button>
           <button onClick = {() => props.deleteData(props.id)}> Delete </button>

           </div>
           </div>
  
      
  
    );
}

export default Task