// API URL for fetching characters
const CharactersUrl = "https://rickandmortyapi.com/api/character";

// DOM Elements
const InputId = document.getElementById("input-id");
const List = document.getElementById("characters-list");
const ShowMore = document.getElementById("show-more");
// Arrays to store existing character IDs and IDs of characters not yet shown
let ExistCharactersId = [];
let NotShowedIDs = [];

// Load function to initialize existing characters from local storage
const Load = () => {
  Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    ExistCharactersId.push(value);
    NotShowedIDs.push(value);
  });
  console.log(ExistCharactersId);
};

// Delete function to remove a character from the list and local storage
const Delete = (id) => {
  document.getElementById("character" + id).remove();
  localStorage.removeItem("character" + id);

  const index = ExistCharactersId.indexOf(id);
  ExistCharactersId.splice(index, 1);

  console.log(ExistCharactersId);
};

// Function to check if a character with a specific ID already exists
const IsAlreadyExist = (id) => {
  for (let i = 0; i < ExistCharactersId.length; i++) {
    if (ExistCharactersId[i] == id) {
      return true;
    }
  }
  return false;
};

// Function to create a character element based on its ID using the API
const MakeCharacter = async (id) => {
  try {
    const response = await fetch(`${CharactersUrl}/${id}`);
    const data = await response.json();

    console.log(data.id);

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

// Function to handle search for a character based on the ID entered in the input field
const Search = async () => {
  let id = InputId.value;

  if (id != "") {
    if (!IsAlreadyExist(id)) {
      const character = await MakeCharacter(id);
      if (character.id != "characterundefined") {
        console.log(character);
        List.appendChild(character);
        ExistCharactersId.push(id);
        localStorage.setItem("character" + id, id);
      }else{
        alert("character not found")
      }
    } else {
      alert("character already exists");
    }
  }
};

// Function to show existing characters in the list
const ShowExisting = async () => {
  for (let i = 0; i < 5; i++) {
    if (i < NotShowedIDs.length) {
      const character = await MakeCharacter(NotShowedIDs[i]);
      if (character) {
        List.appendChild(character);
      }
    }
  }
  NotShowedIDs.splice(0, 5);


};

// Call the Load function on page load to initialize the character list
Load();

// Event listeners for search, showing more characters, and initial character display
document.getElementById("search-button").addEventListener("click", Search);
ShowMore.addEventListener("click", ShowExisting);
document.addEventListener("DOMContentLoaded", ShowExisting);

