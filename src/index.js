let addToy = false;
const toyCollection = document.getElementById("toy-collection");
const newForm = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  rescueToys();
  newToy();
});

function createCard(toy){
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  const h2Name = document.createElement("h2");
  h2Name.innerText = toy.name;
  const imgToy = document.createElement("img");
  imgToy.src = toy.image;
  imgToy.className = "toy-avatar";
  const pLikes = document.createElement("p");
  pLikes.innerText = toy.likes;
  const btn = document.createElement("button");
  btn.innerText = "Like";
  btn.className = "like-btn";
  btn.addEventListener("click", (e) => {
    console.log(e.target.dataset);
    addLikes(e);
  })

  cardDiv.appendChild(h2Name);
  cardDiv.appendChild(imgToy);
  cardDiv.appendChild(pLikes);
  cardDiv.appendChild(btn);
  return cardDiv;

}

function rescueToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(object => {
    for (const toy of object) {
      toyCollection.appendChild(createCard(toy));
    }
  });
}

function newToy(){
  newForm.addEventListener("submit", function(e){
    e.preventDefault();
    const form = e.target;
    const nameInput = form.querySelector("input.input-text");
    const imgUrl = form.querySelector("input.input-text").nextElementSibling.nextElementSibling;
    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imgUrl.value,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(toy => {
      console.log("Toy logged:", toy)
    })
    .catch(error => console.error(error));
  })
}

function addLikes(e){
  e.preventDefault()
  let plusLikes = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: plusLikes
    })
  })
  .then(resp => resp.json())
  .then(object => {
    e.target.previousElementSibling.innerText = `${plusLikes} likes`;
  })
}
