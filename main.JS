// Define global variables and constants

const grid = document.getElementById("main-grid");
const cells = grid.getElementsByClassName("cell");
let gridBuffer = document.createDocumentFragment();


// Set initial grid

for (let i = 0; i < (16 * 16); i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    gridBuffer.appendChild(cell);
}
grid.appendChild(gridBuffer);
//and enables drawing
draw();


// Generate a new grid depending on the size inputted

function createGrid() {

    const size = document.getElementById("grid-size").value;

    grid.innerHTML = ''; // empty current grid

    for (let i = 0; i < (size * size); i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        gridBuffer.appendChild(cell);
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; //Changing grid css 
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; // properties to resize cells

    }

    grid.appendChild(gridBuffer);

    grid.style.gridTemplateRows = `repeat(${size}, 1 fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1 fr)`;

    //and enable drawing
    draw();
}




//Coloring (grey) cells when mouse hovers
function draw() {
    const cells = grid.getElementsByClassName("cell");
    Array.from(cells).forEach((cell) => {
        cell.addEventListener('mouseenter',
            (e) => {
                e.target.classList.add("colored")
            })
    });

}


//Adding button to clear grid
clearButton = document.querySelector("#clear-grid");
clearButton.onclick = clearGrid;

function clearGrid() {
    Array.from(cells).forEach((cell) => {
        cell.classList.remove("colored")
    })
};