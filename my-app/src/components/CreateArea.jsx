import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Zoom } from '@material-ui/core'

function CreateArea(props) {
  const [noteTitle, setNoteTitle] = useState();
  const [noteContent, setNoteContent] = useState();


  function onChange(event) {
    const {name, value} = event.target;
    if (name === "title") {
      setNoteTitle(value);
    } else {
      setNoteContent(value);
    }
  }

  return (
    <div>
      <form 
        className="create-note"
    
      >
        <input
          onChange={onChange}
          name="title"
          placeholder="Title"
          value={noteTitle}
        />
        <textarea
          onChange={onChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={noteContent}
        />
        <Zoom in={true}>
            <Fab     onClick={(event) => {
          props.onAdd({
            title: noteTitle,
            content: noteContent
          });
          event.preventDefault();
          setNoteTitle("");
          setNoteContent("");
        }}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
