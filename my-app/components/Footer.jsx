import React from "react";

//4. Create a Footer.jsx component that renders a <footer> element
//to show a copyright message in a <p> with a dynamically updated year.
const currentDate = new Date();

function Footer(){
    return (<p>Copyright ⓒ {currentDate.getFullYear}</p>);
}

export default Footer;