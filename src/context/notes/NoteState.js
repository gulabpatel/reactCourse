import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "63e21d538cb12f35961ab910",
          "user": "63e1d86992ba72bd2a63a57d",
          "title": "New Note updated2",
          "description": "Please access the playlist updated2",
          "tag": "Youtube",
          "date": "2023-02-07T09:43:47.304Z",
          "__v": 0
        },
        {
          "_id": "63e23349a6d99b314ad6abb4",
          "user": "63e1d86992ba72bd2a63a57d",
          "title": "Adding New Note on Physicd",
          "description": "Please access the Physics playlist",
          "tag": "Physics",
          "date": "2023-02-07T11:17:29.356Z",
          "__v": 0
        },
        {
          "_id": "63e23349a6d99b314ad6abb4",
          "user": "63e1d86992ba72bd2a63a57d",
          "title": "Adding New Note on Physicd",
          "description": "Please access the Physics playlist",
          "tag": "Physics",
          "date": "2023-02-07T11:17:29.356Z",
          "__v": 0
        },
        {
          "_id": "63e23349a6d99b314ad6abb4",
          "user": "63e1d86992ba72bd2a63a57d",
          "title": "Adding New Note on Physicd",
          "description": "Please access the Physics playlist",
          "tag": "Physics",
          "date": "2023-02-07T11:17:29.356Z",
          "__v": 0
        }
      ]
    
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;