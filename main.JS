const grid = document.getElementById("main-grid");

const modeSelector = document.getElementById("mode-selection-form");
let selectedMode = "black";
modeSelector.addEventListener('click', e => changeMode(e));

function changeMode(e) {
    let ancientMode = document.getElementById(selectedMode);
    ancientMode.classList.remove("active-drawing-mode");
    selectedMode = e.target.id;
    e.target.classList.add("active-drawing-mode");
    colorPicker.style.opacity = (selectedMode === "picked") ? "100%" : "0";
}

function draw() {
    const cells = grid.querySelectorAll(".cell");
    Array.from(cells).forEach((cell) => {
        cell.addEventListener('mouseenter',
            (e) => {
                color(e.target, selectedMode)
            })
    });
}

function color(element, selectedMode) {

    switch (selectedMode) {

        case "black":
            element.style.backgroundColor = "#000";
            element.classList.add("colored");
            break;

        case "rainbow":
            //Getting a random RGB color
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
            break;
    }
}

clearButton = document.querySelector("#clear-grid");
clearButton.addEventListener("click", clearGrid);

function clearGrid() {
    const cells = grid.querySelectorAll(".cell");

    Array.from(cells).forEach((cell) => {
        cell.classList.remove("colored");
        cell.classList.add("greyable");
        cell.style.backgroundColor = "rgba(0,0,0,0)";
    });
}

// Minor functions : color picker and display of grid size
const colorPicker = document.getElementById("color-picker");
let pickedColor = colorPicker.value;

colorPicker.addEventListener('input', () =>
    pickedColor = colorPicker.value);


const sizeChooser = document.getElementById("grid-size");
sizeChooser.addEventListener('input', (e) => displaySize(e.target.value));

function displaySize(pixels) {
    document.getElementById("rangeValue").innerHTML = pixels + " x " + pixels;
}


sizeChooser.addEventListener('change', (e) => setTimeout(createGrid(e.target.value), 500));

function createGrid(n) {

    let gridBuffer = document.createDocumentFragment();

    //Empty the grid
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < (n * n); i++) {
        const cell = document.createElement('div');
        cell.className = 'cell greyable';
        cell.style.backgroundColor = "rgba(0,0,0,0)";
        gridBuffer.appendChild(cell);
        grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
        grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    }
    grid.appendChild(gridBuffer);

    draw();
}

createGrid(16);