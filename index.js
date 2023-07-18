const CharactersUrl = "https://rickandmortyapi.com/api/character";

const InputId = document.getElementById("input-id");

const List = document.getElementById("characters-list");

const ShowMore = document.getElementById("show-more");

let ExistCharactersId = [];
let NotShowedIDs = [];

const Load = () => {
  Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    ExistCharactersId.push(value);
    NotShowedIDs.push(value);
  });
  console.log(ExistCharactersId);
};

const Delete = (id) => {
  document.getElementById("character" + id).remove();
  localStorage.removeItem("character" + id);

  const filteredArr = ExistCharactersId.filter((item) => item !== id);

  console.log(ExistCharactersId);
  console.log(filteredArr);

  ExistCharactersId = filteredArr;
};

const IsAlreadyExist = (id) => {
  for (let i = 0; i < ExistCharactersId.length; i++) {
    if (ExistCharactersId[i] == id) {
      return true;
    }
  }
  return false;
};

const MakeCharacter = async (id) => {
  try {
    const response = await fetch(`${CharactersUrl}/${id}`);
    const data = await response.json();

    const character = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("p");
    const deletebtn = document.createElement("button");

    character.className = "character";
    character.id = "character" + data.id;

    deletebtn.textContent = "Delete";
    deletebtn.onclick = () => {
      Delete(data.id);
    };

    name.textContent = data.name;
    image.src = data.image;

    character.appendChild(name);
    character.appendChild(image);
    character.appendChild(deletebtn);

    console.log(ExistCharactersId);

    return character;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const Search = async () => {
  let id = InputId.value;

  if (!IsAlreadyExist(id)) {
    ExistCharactersId.push(id);
    localStorage.setItem("character" + id, id);
    const character = await MakeCharacter(id);
    if (character) {
      List.appendChild(character);
    }
  } else {
    alert("character already exists");
  }
};

const SHowExisting = async () => {
  for (let i = 0; i < 5; i++) {
    if (i < NotShowedIDs.length) {
      const character = await MakeCharacter(NotShowedIDs[i]);
      if (character) {
        List.appendChild(character);
      }
    }
  }
  NotShowedIDs.splice(0, 5);

  if(NotShowedIDs.length==0){
    ShowMore.hidden = true;
  }
};

Load();

document.getElementById("search-button").addEventListener("click", Search);
ShowMore.addEventListener("click", SHowExisting);
document.addEventListener("DOMContentLoaded", SHowExisting);


