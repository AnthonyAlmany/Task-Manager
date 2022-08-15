import React, {useState, useEffect} from "react";
import Task from "./components/Task"
import IndexButton from "./components/IndexButton";
import {staffList, buttonList} from "./lists";

// Firebase
import {db} from "./firebase-config"
import { collection, getDocs, updateDoc, doc} from "firebase/firestore"; 

import "./style/app.scss";


function App() {

const [tasks, setTasks] = useState([]);
const [taskIndex, setTaskIndex] = useState("Bar");
const [selectValue, setSelectValue] = useState("Select Name");


// Get Data
useEffect (() => {
   const getData = async () => {

    const data = await getDocs(collection(db, "tasks"));    

    const stateData = await Promise.allSettled(data.docs.map(async item => {
      const payload = {...item.data(), id: item.id};
      let dateNow = new Date();
      let actualTime = dateNow.getTime() / 1000
 
      if ((actualTime - item.data().date_completed > item.data().lifetime/86400)) {
        const tasksDoc = doc(db, "tasks", item.id);
        const newField = {completed: false};

        await updateDoc(tasksDoc, newField);
        payload.completed = newField.completed; 
      }
      return new Promise((resolve) => resolve(payload));
    }));

    setTasks(stateData.map(({value}) => value));
   
  }
  getData();

}, [])


// Update Data
const updateData = async (id, date) => {
  const d = new Date();
  const today = d.getDate(date)+' '+ d.toLocaleString('default',{month: 'long'},date);
  const getTime = d.getTime() / 1000


  const tasksDoc = await doc(db, "tasks", id);
  const newField = {completed: true, date: today, date_completed: getTime, completedBy: selectValue};
  await updateDoc(tasksDoc, newField)
  
  const data = await getDocs(collection(db, "tasks"));
  setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})));
}



//Update completed property client side on Interval
useEffect(() => {
  const timer = setInterval(() => {
    const hasExpired = task => (((new Date()).getTime() /1000) - task.date_completed) > (task.lifetime/86400);
    setTasks(tasks.map(task =>  hasExpired(task) ? {...task, completed: false} : {...task})); 
  }, 1000);               
  return () => clearInterval(timer);
});



// Filter Task "type" onClick through index buttons
function selectType (type) {
  setTaskIndex(type)
};

const handleChange = (e) => {
  setSelectValue(e.target.value)
}

  return (
    <div className="App">
<div className="message">
  <h4>Demonstration App only. This App's database is stored and updated on Firebase. Each tasks' expiry date has been set in seconds. Completed logo will update once expiry date is reached.</h4>
</div>

  <div className="task-container">
  <div className="task-header">
<div className="task-index">
  {buttonList.map(button =>
    <IndexButton name={button.name} selectType={selectType} taskIndex={taskIndex} key={button.name}/> 
    )}
</div>

   <div className="select-container">
 <select value={selectValue} onChange={handleChange} >
    {staffList.map((option) => (
        <option key={option.name} value={option.name}>{option.name}</option>
    ))}
</select>
</div>
  </div>

  <div className="task-list">
  {tasks.filter(task => task.type === taskIndex).map(task => 
  <Task 
  updateData={updateData.bind(task)} 
  id={task.id} 
  name={task.name} 
  key={task.id} 
  completed={task.completed} 
  completedBy ={task.completedBy}
  date_completed={task.date_completed}
  date={task.date} 
  test={task.test}
  selectValue={selectValue}
  lifetime ={task.lifetime}
  />
  )}
  </div>
    </div>
      </div>

  );
}

export default App;


