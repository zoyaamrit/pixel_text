// Database
const letterColors = {};


function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// all ASCII characters get a color
function assignLetterColors() {
    for (let i = 0; i <= 128; i++) {
        letterColors[String.fromCharCode(i)] = getRandomColor(); 
    }
}

function generatePixelGrid() {

    const inputText = localStorage.getItem('inputText') || '';
    const pixelGrid = document.getElementById('pixelGrid');
    const header = document.querySelector('h1');
    const write = document.querySelector('h2');
    // if there is an old grid, clear it
    pixelGrid.innerHTML = '';

    // manipulate text into an arr of characters
    const characters = inputText.replace(/\s+/g, '').split('');
    const numChars = characters.length;

 
    const pixelSize = 15;
    const maxColumns = Math.floor(window.innerWidth / pixelSize) - 15;
    const squareSize = Math.floor(Math.sqrt(numChars))
    const columns = Math.min(maxColumns, squareSize)
    
    
    const totalCells = columns * Math.floor(numChars / columns);
    
    // add pixels to the grid
    const charsToDisplay = characters.slice(0, totalCells);
    charsToDisplay.forEach(char => {
        const color = letterColors[char] || getRandomColor();
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.backgroundColor = color;

        pixel.addEventListener('mouseover', () => {
            header.textContent += char; 
        });

        pixel.addEventListener('mouseout', () => {
            header.textContent = 'written, '; 
        });

        pixelGrid.appendChild(pixel);
    });

    // grid style based on window
    const numRows = Math.ceil(charsToDisplay.length / columns);
    pixelGrid.style.gridTemplateColumns = `repeat(${Math.min(columns, squareSize)}, ${pixelSize}px)`;
    pixelGrid.style.gridTemplateRows = `repeat(${numRows}, ${pixelSize}px)`;
}

// assign colors
assignLetterColors();

// make grid
if (document.getElementById('pixelGrid')) {
    generatePixelGrid();

}

 function exportDivAsPNG() {
          const div = document.getElementById('pixelGrid');
      
          html2canvas(div).then(canvas => {
            // Convert the canvas to a data URL
            const imgData = canvas.toDataURL('image/png');
            
            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'TextAsImage.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        }


document.getElementById('generateButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    localStorage.setItem('inputText', inputText);
    window.location.href = 'grid.html'; 
});