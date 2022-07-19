const url = 'https://elevation-api.io/api/elevation?points=(39.90974,-106.17188),(62.52417,10.02487)'
async function getElevation(latitude, longitude) {
    let url = `https://elevation-api.io/api/elevation?points=(${latitude},${longitude})`;
    const response = await fetch(url, {mode: 'cors'});
    const elevation = await response.json();

    return elevation;
}

export {
    getElevation,
}