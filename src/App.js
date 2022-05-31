import React, {useState, useEffect} from "react";
import Task from "./components/Task"

import {db} from "./firebase-config"
import { collection, addDoc, getDocs, updateDoc, deleteDoc, writeBatch, doc} from "firebase/firestore"; 

import "./style/app.scss"

function App() {


const taskLists = [{name: "Clean Bar", completed: false, date_completed: null  , lifetime: 10 }, {name: "Clean floor", completed: false, date_completed: null, lifetime: 30 }]

const [tasks, setTasks] = useState([])


async function initDb() {
  const batch = writeBatch(db);

  taskLists.forEach(async task => {
    const docRef = doc(db, "tasks", task.name);
    batch.set(docRef, task);
  });

 await batch.commit();

}


// Get Data
useEffect (() => {
   const getData = async () => {

    const data = await getDocs(collection(db, "tasks"));    

    const stateData = await Promise.allSettled(data.docs.map(async item => {
      const payload = {...item.data(), id: item.id};
      let dateNow = new Date();
      let actualTime = dateNow.getTime() / 1000
   
      if ((actualTime - item.data().date_completed > item.data().lifetime)) {
        const tasksDoc =   doc(db, "tasks", item.id);
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



// Add Data
const addData = async () => { 
  await addDoc(collection(db, "tasks"), {name: "Clean", completed: false, date: null, test: true}, );

  const data = await getDocs(collection(db, "tasks"));
  setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})));
};



// Update Data
const updateData = async (id, completed, date) => {
  const d = new Date();
  const today = d.getDate(date)+' '+ d.toLocaleString('default',{month: 'long'},date);
  let getTime = d.getTime() / 1000

  const tasksDoc = await doc(db, "tasks", id);
  const newField = {completed: !completed, date: today, date_completed: getTime  };
  await updateDoc(tasksDoc, newField)
  
  const data = await getDocs(collection(db, "tasks"));
  setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})));
}

// Remove Data
const deleteData = async(id) => {
  const tasksDoc = doc(db, "tasks", id);
  await deleteDoc(tasksDoc)

  const data = await getDocs(collection(db, "tasks"));
  setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})));
}


// Switch Completed Property
function taskclickHandler() {
let mapped = tasks.map( task => task.id === this.id ? {...task, completed: !task.completed} : {...task});
setTasks(mapped);
}


  return (
    <div className="App">

<div className="task-container">
{tasks.map(task => 
  
  <Task 
  clickHandler={taskclickHandler.bind(task)}
  updateData={updateData.bind(task)} 
  deleteData={deleteData.bind(task)} 
  id={task.id} 
  name={task.name} 
  key={task.id} 
  completed={task.completed} 
  date={task.date} 
  test={task.test}
  />
 )}
    <button onClick={initDb}>Init Data</button>
    <button onClick={addData}>Add Data</button>
</div>

    </div>

  );
}

export default App;




// Get Data
// useEffect (() => {
//   const getData = async () => {

// // Update Data before rendering with condition
// // map through data.docs => conditional rendering => update data => get data

//    const data = await getDocs(collection(db, "tasks"));    
//    // const outDatedOnly = (item) => item.test;

//    // const updatedData = await Promise.all(data.docs.map((doc) => { 
//    //   const promise = new Promise((resolve) => resolve({...doc.data(), id: doc.id}));
//    //   return outDatedOnly({...doc.data(), id: doc.id}) ? resetTask(doc.id) : promise }));

//    // setTasks(updatedData);
//        setTasks(data.docs.map(doc =>({...doc.data(), id: doc.id })));
//  }
//  getData();
// }, [])







// // Add Data
// const addData = async () => { 
//  await addDoc(collection(db, "tasks"), {name: "Clean", completed: false, date: null, test: true} );

//  const data = await getDocs(collection(db, "tasks"));
//  setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})));
// };

// // const resetTask = async (id) => {
// //   const tasksDoc = await doc(db, "tasks", id);
// //   const newField = {completed: false, date: null, test: false};
// //   await updateDoc(tasksDoc, newField);

// //   const promise = Promise((resolve) => resolve({...tasksDoc, ...newField, id: id})); 
// //   return promise;
// // };

// // Update Data
// const updateData = async (id, completed, date, test) => {
//  const d = new Date();
//  const today = d.getDate(date)+' '+ d.toLocaleString('default',{month: 'long'},date);

//  const tasksDoc = await doc(db, "tasks", id);
//  const newField = {completed: !completed, date: today };

//  // if (test !== undefined) { 
//  //   newField.test = test;
//  // }

//  await updateDoc(tasksDoc, newField)

//  const data = await getDocs(collection(db, "tasks"));

//  setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})));
// }