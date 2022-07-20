import getTopographyColor from './topography';

const topoKey = () => {
    let keySteps = [0, 1, 201, 501, 751, 1001, 2001, 3001, 4001];
    console.log(keySteps.length);
    const topoKeyDiv = document.createElement('div');
    const header = document.createElement('div');
    header.textContent = 'Elevation Key (meters)';
    topoKeyDiv.appendChild(header);

    for (let i = 0; i < keySteps.length; i++) {
        console.log(i);
        let keyRow = document.createElement('div');
        keyRow.classList.add('keyrow');

        let valueDiv = document.createElement('div');
        valueDiv.classList.add('value');
        let valueString = '';
        if (i == 0) {
            valueString = `${keySteps[i]}`;
        } else if (i == keySteps.length - 1) {
            valueString = `${keySteps[i]}+`
        } else {
            valueString = `${keySteps[i]} - ${keySteps[i + 1]}`;
        }
        valueDiv.textContent = valueString;
        keyRow.appendChild(valueDiv);

        let keyDiv = document.createElement('div');
        keyDiv.classList.add('key');
        let rgb = getTopographyColor(keySteps[i])
        keyDiv.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        keyRow.appendChild(keyDiv);

        topoKeyDiv.appendChild(keyRow);
    }

    return topoKeyDiv;
}

export default topoKey;