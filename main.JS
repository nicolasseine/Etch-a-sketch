// Define global variables and constants

const grid = document.getElementById("main-grid");
const selectedModeDisplay = document.getElementById("selected-mode-display");
const colorPicker = document.getElementById("color-picker");
let gridBuffer = document.createDocumentFragment();
const size = document.getElementById("grid-size").value;





// 2. Generate a new grid depending on the size inputted

function createGrid(n) {


    grid.innerHTML = ''; // empty current grid

    for (let i = 0; i < (n * n); i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        gridBuffer.appendChild(cell);
        grid.style.gridTemplateRows = `repeat(${n}, 1fr)`; //Changing grid css 
        grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`; // properties to resize cells

    }

    grid.appendChild(gridBuffer);

    grid.style.gridTemplateRows = `repeat(${n}, 1 fr)`;
    grid.style.gridTemplateColumns = `repeat(${n}, 1 fr)`;

    //and enable drawing
    draw();
}



// 3.Enable choosing drawing mode

const modeSelector = document.getElementById("mode");
let selectedMode = modeSelector.value;
console.log(selectedMode);

function updateMode() {
    const cells = grid.querySelectorAll(".cell");

    selectedMode = document.getElementById("mode").value;
    selectedModeDisplay.textContent = (selectedMode === "1") ? "Noir" : (selectedMode === "2") ? "aléatoire" : (selectedMode === "3") ? "gris" : "au choix";
    if (selectedMode === "3") {
        for (let cell of cells) {
            if (!cell.classList.contains("colored")) {
                cell.style.backgroundColor = "rgba(0,0,0,0)";
            }
            cell.classList.add("greyable");


        }
    }
}


// 4. Coloring cells when mouse hovers
// listen for hovering

function draw() {
    const cells = grid.querySelectorAll(".cell");

    Array.from(cells).forEach((cell) => {
        cell.addEventListener('mouseenter',
            (e) => {
                color(e.target, selectedMode)
            })
    });
}

// changing color depending on selected mode 

function color(element, selectedMode) {
    console.log(selectedMode);
    console.log(typeof selectedMode);

    switch (selectedMode) {

        case "1": // black
            element.style.backgroundColor = "#000";
            element.classList.add("colored");
            console.log("ok");
            break;

        case "2": // rainbow
            const random = n => Math.floor(Math.random() * (n + 1));
            let r = random(255);
            let g = random(255);
            let b = random(255);
            let rgb = `rgb(${r},${g},${b})`;
            element.style.backgroundColor = rgb;
            element.classList.add("colored");
            break;
        case "3": //grey
            element.classList.add("colored");
            if (element.classList.contains("greyable")) {
                const currentColor = `" ${element.style.backgroundColor}"`;
                let alpha = +(currentColor.slice(currentColor.lastIndexOf(",") + 1,
                    currentColor.lastIndexOf(')')));
                console.log(alpha);
                let newalpha = alpha + 0.1;
                if (newalpha == 1) {
                    element.classList.remove("greyable");
                }
                console.log(newalpha);
                const newColor = `rgba(0,0,0,${newalpha})`;
                element.style.backgroundColor = newColor;
            }
            break;
        case "4": //color selector:
            element.style.backgroundColor = pickedColor;
            element.classList.remove("colored");
    }
}





//5 Button to clear grid

function clearGrid() {
    const cells = grid.querySelectorAll(".cell");

    Array.from(cells).forEach((cell) => {
        cell.classList.remove("colored");
        cell.classList.add("greyable");
        cell.style.backgroundColor = "white";
        updateMode();
    });
}

clearButton = document.querySelector("#clear-grid");
clearButton.addEventListener("click", clearGrid);

// 6. Color picker
let pickedColor = colorPicker.value;
colorPicker.addEventListener('change', () =>
    pickedColor = colorPicker.value);




// slider functions
function rangeSlide(pixels) {
    document.getElementById("rangeValue").innerHTML = pixels + " x " + pixels;
}

function updateAndCreateGrid(pixels) {
    rangeSlide(pixels);
    setTimeout(createGrid(pixels), 1000);
}

createGrid(size);
updateMode();