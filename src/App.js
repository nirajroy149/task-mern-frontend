import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  // const baseUrl = "http://localhost:5000";
  const baseUrl = "https://task-mern-api.onrender.com";
  

  const [newTask,setNewTask] = useState({
    title: "",
    description: ""
  })
  const [taskData,setTaskData] = useState();
  const [loading,setLoading] = useState(true);

  const loadAllData = async () => {
    await axios
      .get(`${baseUrl}/getTasks`)
      .then(({ data }) => {
        console.log(data);
        setTaskData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const addTask = async ({title,description}) => {
    const data = { title, description, isCompleted: false };
    await axios
      .post(`${baseUrl}/addTask`, data)
      .then(() => {
        console.log("Successfully added");
        setNewTask({title: "",description:""});
        setLoading(true);
        loadAllData();
      })
      .catch((err) => console.log("Error occurred"));
  };

  const deleteAll = async () => {
    await axios
    .post(`${baseUrl}/deleteAll`)
    .then(()=>{
      console.log("Deleted all")
      setLoading(true);
      loadAllData();
    })
    .catch((err)=>console.log(err))
  }

  const deleteOne = async (_id) => {
    await axios
    .post(`${baseUrl}/deleteTask`,{_id})
    .then(()=>{
      console.log("Deleted task")
      setLoading(true);
      loadAllData();
    })
    .catch((err)=>console.log(err))
  }
  // const updateStatus = async (_id) => {
  //   await axios
  //   .post(`${baseUrl}/deleteTask`,{_id})
  //   .then(()=>{
  //     console.log("Deleted task")
  //     setLoading(true);
  //     loadAllData();
  //   })
  //   .catch((err)=>console.log(err))
  // }

 function handleChange(e){
    const {name,value} = e.target;
    setNewTask((preValue)=>{
      return {...preValue,[name]:value}
    })
 }
 function handleSubmit(e){
  if(newTask.title && newTask.description){
    addTask(newTask)
  }
    
 }

 function handleDeleteAll(){
  deleteAll();
 }

  useEffect(() => {
    loadAllData();
    // No need to skip the ESLint warning
  }, []);

  return (
    <>
      <div className="appContainer">
        <div className="topContainer">Task Management Application</div>
      

      <div className="inputContainer">
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newTask.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            value={newTask.description}
            onChange={handleChange}
          />
        </div>
        <div>
        <button type="submit" onClick={handleSubmit}>Add</button>
        <button type="submit" onClick={handleDeleteAll}>Delete All</button>
        </div>
      </div>

    {
      loading ? <h3>Loading...</h3>: (
        <div className="taskViewer">
          {taskData.map((task)=>{
            return <div id={task._id} key={task._id}>
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Status: {task.isComplete ? "Conpleted": "Incomplete"}</p>
              <button type="submit" onClick={()=>deleteOne(task._id)}>Delete</button>
              {/* <button type="submit" onClick={()=>updateStatus(task._id)}>Update Status</button> */}
            </div>
          })}
      </div>
      )
    }

      
      </div>
    </>
  );
}

export default App;
