import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    //console.log(newNote);
    setNotes((prevNotes) => {
      //.log([...prevNotes]);
      return [...prevNotes, newNote];
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => {
        //console.log(note.title);
        return <Note title={note.title} content={note.content} />;
      })}
      <Footer />
    </div>
  );
}

export default App;
