import React from "react";
import Term from "./Term";
import emojipedia from "../emojipedia";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {emojipedia.map(term => (
            <Term 
                key={term.id} 
                emoji={term.emoji} 
                name={term.name} 
                meaning={term.meaning} 
            />
        ))}
      </dl>
    </div>
  );
}

export default App;
