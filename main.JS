const grid = document.getElementById("main-grid");
console.log(grid.style);


// adding a grid depending on the input
function createGrid() {
    const size = document.getElementById("grid-size").value;

    grid.innerHTML = '';
    let gridBuffer = document.createDocumentFragment();


    for (let i = 0; i < (size * size); i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        gridBuffer.appendChild(cell);
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    }

    grid.appendChild(gridBuffer);

    grid.style.gridTemplateRows = `repeat(${size}, 1 fr)`;
    grid.style.gridTemplateColumns = `repeat(${size}, 1 fr)`;

}


//Coloring (grey) cells when mouse hovers
const cells = grid.getElementsByClassName("cell");
console.log(cells);
Array.from(cells).forEach((div) => {
    div.addEventListener('mouseenter', (e) => {
        e.target.classList.add("greyed")
    })
});

//Adding button to clear the grid
clearButton = document.querySelector("#clear-grid");
clearButton.onclick = clearGrid;

function clearGrid() {
    Array.from(cells).forEach((cell) => {
        cell.classList.remove("greyed")
    })
};