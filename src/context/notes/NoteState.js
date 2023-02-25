import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []   
    const [notes, setNotes] = useState(notesInitial)
    
    // Get all Note
    const getNotes = async () => {
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMWQ4Njk5MmJhNzJiZDJhNjNhNTdkIn0sImlhdCI6MTY3NTc1NTIwMH0.qCZn7kgv75weClWzG3GlQ3RflPPILb0YWnW6-yrJaWk"
                }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

    // Add a Note
    const addNote = async(title, description, tag)=>{
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMWQ4Njk5MmJhNzJiZDJhNjNhNTdkIn0sImlhdCI6MTY3NTc1NTIwMH0.qCZn7kgv75weClWzG3GlQ3RflPPILb0YWnW6-yrJaWk"
                },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();
      setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
                  'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMWQ4Njk5MmJhNzJiZDJhNjNhNTdkIn0sImlhdCI6MTY3NTc1NTIwMH0.qCZn7kgv75weClWzG3GlQ3RflPPILb0YWnW6-yrJaWk"
                }
      });
      const json = response.json();
      console.log("Deleting the note with id", id, json);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    // Edit a Note
    const editNote = async(id, title, description, tag)=>{
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
                  'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMWQ4Njk5MmJhNzJiZDJhNjNhNTdkIn0sImlhdCI6MTY3NTc1NTIwMH0.qCZn7kgv75weClWzG3GlQ3RflPPILb0YWnW6-yrJaWk"
                },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index=0; index<newNotes.length; index++){
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;