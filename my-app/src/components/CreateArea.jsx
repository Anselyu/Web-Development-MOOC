import React from "react";

function CreateArea(props) {
  const test = {
    title: "Note Title",
    content: "Note Content"
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          props.onAdd(test);
          event.preventDefault();
        }}
      >
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Take a note..." rows="3" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
