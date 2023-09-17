class Map {
    constructor(canvas, gridSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = gridSize;
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.mapData = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }

    drawMap() {
        const { ctx, gridSize, centerX, centerY, mapData } = this;
        for (let y = 0; y < mapData.length; y++) {
            for (let x = 0; x < mapData[y].length; x++) {
                const tile = mapData[y][x];
                ctx.fillStyle = tile === 1 ? 'black' : 'white';
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            }
        }
    }
}

class Rays {
    constructor(canvas, gridSize, angleSlider) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = gridSize;
        this.angleSlider = angleSlider;
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.angleSlider.addEventListener('input', () => this.drawRays());
    }

    drawRays() {
        const { ctx, canvas, gridSize, centerX, centerY } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        map.drawMap();
        const angle = parseInt(this.angleSlider.value);
        for (let rayAngle = angle - 45; rayAngle <= angle + 45; rayAngle += 0.5) {
            const radians = (rayAngle - 90) * (Math.PI / 180);
            for (let i = 0; i < canvas.width; i++) {
                const dx = Math.cos(radians) * i;
                const dy = Math.sin(radians) * i;
                const intersectionX = centerX + dx;
                const intersectionY = centerY + dy;
                const gridX = Math.floor(intersectionX / gridSize);
                const gridY = Math.floor(intersectionY / gridSize);
                if (gridX >= 0 && gridX < map.mapData[0].length && gridY >= 0 && gridY < map.mapData.length) {
                    const tile = map.mapData[gridY][gridX];
                    if (tile === 1) {
                        ctx.beginPath();
                        ctx.moveTo(centerX, centerY);
                        ctx.lineTo(gridX * gridSize + gridSize / 2, gridY * gridSize + gridSize / 2);
                        ctx.strokeStyle = 'red';
                        ctx.stroke();
                        break;
                    }
                }
            }
        }
    }
}

const canvas = document.getElementById('mapCanvas');
const angleSlider = document.getElementById('angleSlider');
const gridSize = 40;

const map = new Map(canvas, gridSize);
const rays = new Rays(canvas, gridSize, angleSlider);

rays.drawRays();
