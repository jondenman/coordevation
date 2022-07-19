const getTopographyColor = (elevation) => {
    let rgb = {r: 0, g: 0, b: 0};
    if (elevation < 1) {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 250;
    } else if (elevation >= 1 && elevation <= 200){
        rgb.r = 149;
        rgb.g = 207;
        rgb.b = 187;
    } else if (elevation > 200 && elevation <= 500) {
        rgb.r = 107;
        rgb.g = 214;
        rgb.b = 105;
    } else if (elevation > 500 && elevation <= 750) {
        rgb.r = 234;
        rgb.g = 235;
        rgb.b = 81;
    } else if (elevation > 750 && elevation <= 1000) {
        rgb.r = 217;
        rgb.g = 206;
        rgb.b = 75;
    } else if (elevation > 1000 && elevation <= 2000) {
        rgb.r = 209;
        rgb.g = 180;
        rgb.b = 71;
    } else if (elevation > 2000 && elevation <= 3000) {
        rgb.r = 196;
        rgb.g = 157;
        rgb.b = 56;
    } else if (elevation > 3000 && elevation <= 4000) {
        rgb.r = 185;
        rgb.g = 136;
        rgb.b = 58;
    } else {
        rgb.r = 176;
        rgb.g = 117;
        rgb.b = 41;
    }
    return rgb;
}

export default getTopographyColor;