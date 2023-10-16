const wallColorPicker = document.getElementById('wallColorPicker');
const skyColorPicker = document.getElementById('skyColorPicker');
const floorColorPicker = document.getElementById('floorColorPicker');

wallColorPicker.addEventListener('input', function () {
    const newColor = wallColorPicker.value;
    grid.wallColor = newColor;
    localStorage.setItem('wallColor', newColor);
});

skyColorPicker.addEventListener('input', function () {
    const newColor = skyColorPicker.value;
    grid.setSkyColor(newColor);
});

floorColorPicker.addEventListener('input', function () {
    const newColor = floorColorPicker.value;
    grid.setFloorColor(newColor);
});