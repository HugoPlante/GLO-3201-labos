let dropdown = document.getElementById("dropdown-input");
let dropdownOptions = document.getElementById("dropdown-options");

dropdown.addEventListener("click", () => {
    dropdownOptions.classList.remove("hide");
});

dropdown.addEventListener("blur", () => {
    dropdownOptions.classList.add("hide");
});

let dropdownInput = document.getElementById("dropdown-input");
dropdownInput.addEventListener('input', () => {
    let value = dropdownInput.value;

    let filter = value.toLowerCase();
    let options = Array.from(document.getElementsByClassName("option"));

    options.forEach(option => {
        let value = option.textContent;
        if (value.toLowerCase().includes(filter) || value === '') {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
    if (options.some(option => option.style.display === "block") === false) {
        let noOption = document.getElementById("no-option");
        noOption.style.display = "block";
    } else {
        let noOption = document.getElementById("no-option");
        noOption.style.display = "none";
    }
});

document.querySelectorAll('.option').forEach(option => {
    console.log(option);
    option.addEventListener('click', () => {
        console.log(option.textContent);
        dropdownInput.setAttribute('value', option.textContent);;
    })
})
