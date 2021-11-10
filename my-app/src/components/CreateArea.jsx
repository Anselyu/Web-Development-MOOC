import React, { useState } from "react";

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
        onSubmit={(event) => {
          props.onAdd({
            title: noteTitle,
            content: noteContent
          });
          event.preventDefault();
          setNoteTitle("");
          setNoteContent("");
        }}
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
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
