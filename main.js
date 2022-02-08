// let url = 'https://rickandmortyapi.com/api/character/?page=';
let currentPage = 1;
const container = document.querySelector(".container");
const pagination = document.querySelector(".pagination");

// PAGINATION

const goToNextPage = () => {
  right();
  fetchData();
};

const goToPreviousPage = () => {
  fetchData();
};

const right = () => {
  if (currentPage < 40) return (currentPage += 1);
};
const left = () => {
  if (currentPage > 1) return (currentPage -= 1);
};

function createNumbers() {
  const nazad = document.createElement("button");
  nazad.textContent = "<";
  nazad.className = "dugmeta";
  pagination.appendChild(nazad);

  let nizBrojeva = [];

  if (currentPage >= 0 && currentPage <= 3) {
    nizBrojeva = [1, 2, 3, 4, 5];
  } else if (currentPage > 3 && currentPage < 41) {
    nizBrojeva = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  } else if (currentPage > 40) {
    nizBrojeva = [38, 39, 40, 41, 42];
  }

  nizBrojeva.forEach((e) => {
    const dugmeta = document.createElement("button");
    dugmeta.textContent = e;
    dugmeta.className = "dugmeta";
    pagination.appendChild(dugmeta);
    dugmeta.addEventListener("click", () => {
      currentPage = e;
      fetchData();
    });
  });

  console.log(nizBrojeva);

  const napred = document.createElement("button");
  napred.textContent = ">";
  napred.className = "dugmeta";
  pagination.appendChild(napred);

  napred.addEventListener("click", goToNextPage);
  nazad.addEventListener("click", goToPreviousPage);
}

// FETCH DATA

function fetchData() {
  const brojovi = document.querySelectorAll(".dugmeta");
  brojovi.forEach((el) => el.remove());
  createNumbers();
  fetch("https://rickandmortyapi.com/api/character/?page=" + currentPage)
    .then((res) => res.json())
    .then((res) => createCharacter(res));
}

function createCharacter(data) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((element) => element.remove());

  data.results.map((e) => {
    const card = document.createElement("div");
    const name = document.createElement("h3");
    const img = document.createElement("img");
    const likeButton = document.createElement("button");
    const like = document.createElement("i");

    likeButton.className = "likeDugme";
    card.className = "card";
    img.setAttribute("src", e.image);
    name.textContent = e.name;
    likeButton.textContent = "LIKE";
    likeButton.appendChild(like);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(likeButton);

    likeButton.addEventListener("click", () => {
      singleUser(e);
    });

    container.appendChild(card);
  });
}

function singleUser(e) {
  sessionStorage.setItem("user", e.id);
  window.open("./single.html", "_self");
}

window.addEventListener("load", () => {
  fetchData();
});
