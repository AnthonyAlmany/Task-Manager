import React from 'react'

function IndexButton(props) {

  return (
    <div>
        <button id={props.name === props.taskIndex ? "button-selected" : "button-noselect"} onClick={() => props.selectType(props.name)}>{props.name}</button>
    </div>
  )
}

export default IndexButton