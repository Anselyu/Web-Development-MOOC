import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Zoom } from '@material-ui/core'

function CreateArea(props) {
  const [noteTitle, setNoteTitle] = useState();
  const [noteContent, setNoteContent] = useState();
  const [isClicked, setClicked] = useState(false);

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
      <form className="create-note">
        {isClicked && 
          <input
            onChange={onChange}
            name="title"
            placeholder="Title"
            value={noteTitle}
          />
        }
        <textarea
          onClick={() => {
            setClicked(!isClicked);
          }}
          onChange={onChange}
          name="content"
          placeholder="Take a note..."
          rows={isClicked ? "3" : "1"}
          value={noteContent}
        />
        <Zoom in={isClicked}>
          <Fab onClick={(event) => {
            props.onAdd({
            title: noteTitle,
            content: noteContent
          });
          event.preventDefault();
          setNoteTitle("");
          setNoteContent("");
          }}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
