import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title:"", description:"", tag:"default"})
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"", description:"", tag:""})
    props.showAlert("Added successfully", "success")
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div className='contaner my-3'>
      <h1>Add a Note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title" className='form-label'>Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="desc" name='description' value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className='form-label'>Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
