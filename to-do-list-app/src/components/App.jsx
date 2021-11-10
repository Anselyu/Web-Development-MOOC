import React, { useState } from "react";
import Heading from "./Heading";
//import List from "./List";
import Item from "./Item";

function App() {
  const [inputText, setInputText] = useState("");
  const [listItems, setListItems] = useState(["hi"]);
  function handleChange(event) {
    setInputText(event.target.value);
  }

  function onSubmit() {
    setListItems((prev) => [...prev, inputText]);
    setInputText("");
  }

  function deleteItem(id) {
    setListItems((prev) => {
      return prev.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <Heading />
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button type="submit" onClick={onSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listItems.map((item, index) => (
            <Item key={index} id={index} content={item} onCheck={deleteItem} />
          ))}
        </ul>

        {/* <List /> */}
      </div>
    </div>
  );
}

export default App;
