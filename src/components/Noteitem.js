import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../context/notes/Notescontext';
export default function Noteitem(props) {
   const context=useContext(MyContext);
    const {deleteNote}=context;
    const {note,editNote}=props;
  return (
   <div className='col-md-3 mx-3 my-3'>
    <div className="card">
    <h5 className="card-header">{note.author}</h5>
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">
        {note.description}
      </p>
      <Link to="#" className="btn btn-primary">
        Go somewhere
      </Link>
      <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
      <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editNote(note)}}></i>
    </div>
  </div>
  </div>
  )
}
