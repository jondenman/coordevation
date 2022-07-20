import * as api from './apiCalls';
import getTopographyColor from './topography';
import topoKey from './topoKey';

const contentDiv = document.getElementById('content');
const heroRight = document.querySelector('.hero-right');

async function onClick (e) {
    console.log(e);
    // const canvas = document.querySelector('canvas')
    const rect = contentDiv.getBoundingClientRect()
    let x = e.x
    let y = e.y

    let latitude = scale(0, window.innerWidth, 25, 50, x);
    let longitude = scale(window.innerHeight, 0, 125, 70, y);
    let rgb = {r: 0, g: 0, b: 0};
    try {
        var elevationResponse = await api.getElevation(latitude, longitude);
        console.log(elevationResponse.elevations[0].elevation);
        let elevation = elevationResponse.elevations[0].elevation;
        rgb = getTopographyColor(elevation);
        x += window.pageXOffset;
        y += window.pageYOffset;
        let nodeText = getNodeString(latitude, longitude, elevation);
        addNode(x, y, rgb.r, rgb.g, rgb.b, nodeText);
    } catch (err) {
        console.log('error');
    }
}

// function to scale a number with range constraints
function scale(currentMin, currentMax, scaleMin, scaleMax, num) {
    let currRange = currentMax - currentMin;
    let scaleRange = scaleMax - scaleMin;
    return (((num - currentMin) * scaleRange) / currRange) + scaleMin;
}

// add a square at given position with given color
function addNode(xPosition, yPosition, red, green, blue, text) {
    let nodeDiv = document.createElement('div');
    nodeDiv.classList.add('node');
    nodeDiv.style.left = `${xPosition}px`; 
    nodeDiv.style.top = `${yPosition}px`;
    nodeDiv.style.backgroundColor = `rgb(${red},${green},${blue})`;
    
    let nodeText = document.createElement('span');
    nodeText.classList.add('nodetext');
    nodeText.textContent = text;

    nodeDiv.appendChild(nodeText);
    contentDiv.appendChild(nodeDiv);
}

function getNodeString(latitude, longitude, elevation) {
    return `lat: ${latitude.toFixed(5)} long: ${longitude.toFixed(5)} elevation: ${elevation}`;
}

heroRight.appendChild(topoKey());
contentDiv.addEventListener('click', onClick);