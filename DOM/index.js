var thirdList = document.querySelector("UL").lastElementChild;
thirdList.innerHTML = "Hello World!";

var button = document.querySelector("button");
button.style.backgroundColor = "blue";

var header = document.querySelector("h1");
header.classList.toggle("huge");

header.innerHTML = "<em>Helloo</em>";

document.querySelector("a").setAttribute("href","https://ca.yahoo.com/?p=us");