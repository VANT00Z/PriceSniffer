const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

// Константы
const speed = 0.8;            // Скорость
const lineWidth = 4;          // Толщина линии
const lineColor = '#FF0000';
const arrowOffset = 25;       // Отступ конца от правого края

let points = [];
let frameCount = 0;

// Функция генерации точек с увеличенным разбросом по высоте
function generateNextY(lastY) {
    // Диапазон работы
    const minDelta = 5;
    const maxDelta = 40;
    const randomDelta = minDelta + Math.random() * (maxDelta - minDelta);

    const direction = Math.random() < 0.52 ? -1 : 1;

    let newY = lastY + (direction * randomDelta);

    // Отступы (верх/низ)
    const padding = 10;
    if (newY < padding) newY = padding;
    if (newY > canvas.height - padding) newY = canvas.height - padding;

    return newY;
}

// let currentY = canvas.height / 2;
let currentY = canvas.height

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = canvas.width - arrowOffset;

    // Интервал
    if (frameCount % 7 === 0) {
        currentY = generateNextY(currentY);
        points.unshift({ x: startX, y: currentY });
    }
    frameCount++;

    for (let i = 0; i < points.length; i++) {
        points[i].x -= speed;
    }
    points = points.filter(p => p.x > -10);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'butt';
    ctx.miterLimit = 25;

    if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }

    // Отрисовка стрелки
    // if (points.length > 1) {
    //     const headX = points[0].x;
    //     const headY = points[0].y;

    //     const angle = Math.atan2(points[0].y - points[1].y, points[0].x - points[1].x);
    //     const arrowLength = 10;

    //     ctx.beginPath();
    //     ctx.moveTo(headX, headY);

    //     ctx.lineTo(
    //         headX - arrowLength * Math.cos(angle - Math.PI / 6),
    //         headY - arrowLength * Math.sin(angle - Math.PI / 6)
    //     );

    //     ctx.moveTo(headX, headY);

    //     ctx.lineTo(
    //         headX - arrowLength * Math.cos(angle + Math.PI / 6),
    //         headY - arrowLength * Math.sin(angle + Math.PI / 6)
    //     );

    //     ctx.stroke();
    // }

    requestAnimationFrame(animate);
}

animate();
