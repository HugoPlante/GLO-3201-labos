let dropdown = document.getElementById("dropdown-input");
let dropdownOptions = document.getElementById("dropdown-options");
let dropdownInput = document.getElementById("dropdown-input");

const animals = ["Chien ๐ถ", "Chat ๐ฑ", "Lapin ๐ฐ", "Poisson ๐", "Oiseau ๐ฆ", "Serpent ๐", "Tortue ๐ข", "Lion ๐ฆ", "Panda ๐ผ", "Poule ๐", "Vache ๐ฎ",];

window.addEventListener('load', () => {
    updateOptions(animals);
});

dropdownInput.addEventListener("click", () => {
    dropdownOptions.classList.remove("hide");
});

dropdownInput.addEventListener("blur", () => {
    dropdownOptions.classList.add("hide");
});

dropdownInput.addEventListener('input', () => {
    let value = dropdownInput.value;
    let filter = value.toLowerCase();

    let options = animals.filter(option => option.toLowerCase().startsWith(filter));

    if (options.length === 0) {
        options = ["Aucun rรฉsultat :("];
    }

    updateOptions(options);
});

function updateOptions(options) {
    dropdownOptions.innerHTML = "";

    options.forEach(option => {
        let optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        dropdownOptions.appendChild(optionElement);
    });
}