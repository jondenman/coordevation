import * as api from './apiCalls';
import getTopographyColor from './topography';

const contentDiv = document.getElementById('content');

async function onClick (e) {
    console.log(e);
    let latitude = scale(0, window.innerWidth, 25, 50, e.x);
    let longitude = scale(window.innerHeight, 0, 125, 70, e.y);
    let rgb = {r: 0, g: 0, b: 0};
    try {
        var elevationResponse = await api.getElevation(latitude, longitude);
        console.log(elevationResponse.elevations[0].elevation);
        let elevation = elevationResponse.elevations[0].elevation;
        rgb = getTopographyColor(elevation);
    } catch (err) {
        console.log('error');
    }
    
    addNode(e.x, e.y, rgb.r, rgb.g, rgb.b);
    
}

// function to scale a number with range constraints
function scale(currentMin, currentMax, scaleMin, scaleMax, num) {
    let currRange = currentMax - currentMin;
    let scaleRange = scaleMax - scaleMin;
    return (((num - currentMin) * scaleRange) / currRange) + scaleMin;
}

// add a square at given position with given color
function addNode(xPosition, yPosition, red, green, blue) {
    let nodeDiv = document.createElement('div');
    nodeDiv.classList.add('node');
    nodeDiv.style.left = `${xPosition}px`; 
    nodeDiv.style.top = `${yPosition}px`;
    nodeDiv.style.backgroundColor = `rgb(${red},${green},${blue})`;
    
    contentDiv.appendChild(nodeDiv);
}

contentDiv.addEventListener('click', onClick);