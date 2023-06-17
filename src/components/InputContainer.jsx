import React from "react";

function InputContainer(props) {
    function handleChange(e){
      console.log("Hello from")
      props.handleChange(e);
    }
  return (
    <div className="inputContainer">
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" id="title" value={props.title} onChange={(e)=>handleChange(e)}/>
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input type="text" name="description"  id="description" value={props.description} onChange={(e)=>handleChange(e)}/>
      </div>
      <button type="submit">Submit</button>
    </div>
  );
}

export default InputContainer;
