const id = sessionStorage.getItem("user");
const link = "https://rickandmortyapi.com/api/character/";
const divac = document.querySelector(".container");

// FETCH DATA

function fetchData() {
  fetch("https://rickandmortyapi.com/api/character/" + id)
    .then((res) => res.json())
    .then((res) => charactersData(res));
}

// CREATE CHARACTER CARD

function charactersData(e) {
  const div = document.createElement("div");
  const name = document.createElement("h1");
  const status = document.createElement("p");
  const img = document.createElement("img");

  img.setAttribute("src", e.image);
  name.textContent = e.name;
  status.textContent = e.status;

  div.appendChild(name);
  div.appendChild(status);
  div.appendChild(img);
  divac.appendChild(div);
}

window.addEventListener("load", fetchData);
