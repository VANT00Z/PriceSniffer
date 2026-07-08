const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

// Константы
const speed = 0.8;
const lineColor = '#FF0000';
const arrowOffset = 25;
const minDelta = 5;
const maxDelta = 40;
const padding = 10;
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const startX = canvasWidth - arrowOffset;
const filterThreshold = -10;
const directionBias = 0.52;

// Предварительная настройка стилей
ctx.lineWidth = 4;
ctx.strokeStyle = lineColor;
ctx.lineJoin = 'miter';
ctx.lineCap = 'butt';
ctx.miterLimit = 25;

// Буферы для координат
const MAX_POINTS = Math.ceil((startX - filterThreshold) / speed) + 5;
const xBuffer = new Float64Array(MAX_POINTS);
const yBuffer = new Float64Array(MAX_POINTS);
let pointCount = 0;
let frameCount = 0;
let currentY = canvasHeight;

function generateNextY(lastY) {
    const randomDelta = minDelta + Math.random() * (maxDelta - minDelta);
    const direction = Math.random() < directionBias ? -1 : 1;
    const newY = lastY + direction * randomDelta;
    return newY < padding ? padding :
        newY > canvasHeight - padding ? canvasHeight - padding :
            newY;
}

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if ((frameCount++ & 7) === 0) { // Эквивалент frameCount % 7 === 0
        currentY = generateNextY(currentY);
        // Добавление новой точки в начало массива
        if (pointCount < MAX_POINTS) {
            for (let i = pointCount; i > 0; i--) {
                xBuffer[i] = xBuffer[i - 1];
                yBuffer[i] = yBuffer[i - 1];
            }
            xBuffer[0] = startX;
            yBuffer[0] = currentY;
            pointCount++;
        }
    }

    // Обновление позиций и удаление устаревших точек
    let validCount = 0;
    for (let i = 0; i < pointCount; i++) {
        xBuffer[i] -= speed;
        if (xBuffer[i] > filterThreshold) {
            if (i !== validCount) {
                xBuffer[validCount] = xBuffer[i];
                yBuffer[validCount] = yBuffer[i];
            }
            validCount++;
        }
    }
    pointCount = validCount;

    // Отрисовка с использованием буферов
    if (validCount > 1) {
        ctx.beginPath();
        ctx.moveTo(xBuffer[0], yBuffer[0]);
        for (let i = 1; i < validCount; i++) {
            ctx.lineTo(xBuffer[i], yBuffer[i]);
        }
        ctx.stroke();
    }

    requestAnimationFrame(animate);
}

animate();