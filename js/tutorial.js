class Ray {
    constructor(angle) {
        this.angle = angle;
        this.length = 100;
        this.tanValue = Math.tan((this.angle * Math.PI) / 180);
    }

    calculateEndPoint() {
        const x = canvas.width / 2 + this.length * Math.cos((this.angle * Math.PI) / 180);
        const y = canvas.height / 2 - this.length * Math.sin((this.angle * Math.PI) / 180);
        return { x, y };
    }

    setAngle(angle) {
        this.angle = angle;
        this.tanValue = Math.tan((this.angle * Math.PI) / 180);
    }
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const slider = document.getElementById('angle-slider');
const angleDisplay = document.getElementById('angle-display');
const tanDisplay = document.getElementById('tan-display');
const numRays = 60;
const fovAngle = 60;
const rays = [];

for (let i = 0; i < numRays; i++) {
    const angleOffset = (i / (numRays - 1) - 0.5) * fovAngle;
    const headingAngle = parseFloat(slider.value);
    const angle = headingAngle + angleOffset;
    rays.push(new Ray(angle));
}

function drawCartesianPlane() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = 'black';
    context.stroke();

    const angle = parseFloat(slider.value);
    angleDisplay.textContent = `Ángulo: ${angle}°`;

    rays.forEach((ray, index) => {
        const angleOffset = (index / (numRays - 1) - 0.5) * fovAngle;
        ray.setAngle(angle + angleOffset);
    });

    context.strokeStyle = 'gray';
    rays.forEach((ray) => {
        const endPoint = ray.calculateEndPoint();
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(endPoint.x, endPoint.y);
        context.stroke();
    });

    context.strokeStyle = 'red';
    const headingRay = rays[Math.floor((numRays - 1) / 2)];
    const headingEndPoint = headingRay.calculateEndPoint();
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(headingEndPoint.x, headingEndPoint.y);
    context.stroke();

    tanDisplay.textContent = `Tangente: ${headingRay.tanValue.toFixed(2)}`;
}

slider.addEventListener('input', drawCartesianPlane);

drawCartesianPlane();
