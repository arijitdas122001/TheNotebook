import { useState } from "react";
import { MyContext } from "./Notescontext";
const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesinitial = [];
const [notes,setnotes]=useState(notesinitial);
const [alerts,setAlerts]=useState({type:"",msg:""});
// FETCHING ALL NOTES
const getNotes=async()=>{
    const response = await fetch(`${host}/getNotes/allNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Yjk2ZTQ5N2YzMTVmYTU1OTEyZTc2In0sImlhdCI6MTY4MjY3NTQyOX0.I1uDnE1dZ2OV9XiYT8LLmUFIF1r_Sp8J2SMTzeM8xyM"
      },
      // body: JSON.stringify(data),
    });
    const json=await response.json();
    // console.log(json);
    setnotes(json)
  }
// operaton to add delte and edit in the notes 
const addNote=async (author,title,description,tag)=>{
    const response = await fetch(`${host}/getNotes/postNotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Yjk2ZTQ5N2YzMTVmYTU1OTEyZTc2In0sImlhdCI6MTY4MjY3NTQyOX0.I1uDnE1dZ2OV9XiYT8LLmUFIF1r_Sp8J2SMTzeM8xyM"
      },
      body: JSON.stringify({author,title,description,tag}),  
    });
    const note=await response.json();
    console.log(note);
setnotes(notes.concat(note));
}
const deleteNote=async(id)=>{
  const response = await fetch(`${host}/getNotes/deleteNotes/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Yjk2ZTQ5N2YzMTVmYTU1OTEyZTc2In0sImlhdCI6MTY4MjY3NTQyOX0.I1uDnE1dZ2OV9XiYT8LLmUFIF1r_Sp8J2SMTzeM8xyM"
    },
  });
  const note=await response.json();
  console.log(note);
const newnotesinitial=notesinitial.filter((note)=>{
  return note._id!==id;
})
setnotes(newnotesinitial);
// console.log("delte the item with the id of"+id);
}
const EditNote=async(id,author,title,description,tag)=>{
  console.log('clicked');
  const response = await fetch(`${host}/getNotes/updateNote/${id}`, {
    method:'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Yjk2ZTQ5N2YzMTVmYTU1OTEyZTc2In0sImlhdCI6MTY4MjY3NTQyOX0.I1uDnE1dZ2OV9XiYT8LLmUFIF1r_Sp8J2SMTzeM8xyM"
    },
    body:JSON.stringify({author,title,description,tag})
  });
  const json=await response.json();
  let newnote=JSON.parse(JSON.stringify(notes));
  for (let index = 0; index < newnote.length; index++) {
    const element=newnote[index];
    if(element._id===id){
      newnote[index].author=author;
      newnote[index].title=title;
      newnote[index].description=description;
      newnote[index].tag=tag;
      break;
    }
  }
  console.log(json)
  console.log(newnote);
setnotes(newnote);
}
const setAlert=(msg,type)=>{
 setAlerts({
  msg:msg,
  type:type
 });
 setTimeout(() => {
  setAlerts({
    type:"",
    msg:""
  });
 }, 2000);
}
  return (
    <MyContext.Provider value={{ notes,setnotes,getNotes,notesinitial,addNote,deleteNote,EditNote,setAlert,alerts}}>
      {props.children}
    </MyContext.Provider>
  );
};
export default NoteState;
