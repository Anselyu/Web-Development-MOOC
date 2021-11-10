import React from "react";

//4. Create a Footer.jsx component that renders a <footer> element
//to show a copyright message in a <p> with a dynamically updated year.
const currentDate = new Date();


function Footer(){
    return (<footer><p>Copyright ⓒ {currentDate.getFullYear()}</p></footer>);
}

export default Footer;