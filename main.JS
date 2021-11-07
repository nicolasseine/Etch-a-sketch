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
        cell.className = 'cell greyable';
        cell.style.backgroundColor = "rgba(0,0,0,0)";
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

const modeSelector = document.getElementById("mode-selection-form");
let selectedMode = "black";
modeSelector.addEventListener('click', e => changeMode(e));

function changeMode(e) {
    let ancientMode = document.getElementById(selectedMode);
    ancientMode.classList.remove("active-drawing-mode");
    selectedMode = e.target.id;
    e.target.classList.add("active-drawing-mode");
    colorPicker.style.visibility = (selectedMode === "picked") ? "visible" : "hidden";
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

        case "black":
            element.style.backgroundColor = "#000";
            element.classList.add("colored");
            break;

        case "rainbow":
            const random = n => Math.floor(Math.random() * (n + 1));
            let r = random(255);
            let g = random(255);
            let b = random(255);
            let rgb = `rgb(${r},${g},${b})`;
            element.style.backgroundColor = rgb;
            element.classList.add("colored");
            element.classList.add("rainbowed");
            break;

        case "grey":
            element.classList.add("colored");
            //Prevent cells already turned black to turn lighter (see below)
            if (element.classList.contains("greyable")) {

                // Prevents rainbowed cell from turning black
                if (element.classList.contains("rainbowed")) {
                    element.style.backgroundColor = "rgba(0,0,0,0)";
                    element.classList.remove("rainbowed");
                }

                //Extracting the alpha value from the color name string in rgba
                const currentColor = `" ${element.style.backgroundColor}"`;
                let alpha = +(currentColor.slice(currentColor.lastIndexOf(",") + 1,
                    currentColor.lastIndexOf(')')));
                let newalpha = alpha + 0.1;
                if (newalpha == 1) {
                    element.classList.remove("greyable");
                }
                const newColor = `rgba(0,0,0,${newalpha})`;
                element.style.backgroundColor = newColor;
            }
            break;

        case "picked":
            element.style.backgroundColor = pickedColor;
            element.classList.add("colored");
            element.classList.add("rainbowed");

            break;

        case "eraser":
            element.style.backgroundColor = "rgba(0, 0, 0, 0)";
            element.classList.remove("colored");
    }
}

//5 Button to clear grid

function clearGrid() {
    const cells = grid.querySelectorAll(".cell");

    Array.from(cells).forEach((cell) => {
        cell.classList.remove("colored");
        cell.classList.add("greyable");
        cell.style.backgroundColor = "rgba(0,0,0,0)";
    });
}

clearButton = document.querySelector("#clear-grid");
clearButton.addEventListener("click", clearGrid);

// 6. Color picker
let pickedColor = colorPicker.value;
colorPicker.addEventListener('input', () =>
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