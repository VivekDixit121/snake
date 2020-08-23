let canvas = document.getElementById('snake');
let ctx = canvas.getContext("2d");
let box = 32;
const ground = new Image();
ground.src = "ground.png";
const foodImg = new Image();
foodImg.src = "food.png";
ctx.drawImage(ground, 0, 0)
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 8 * box
}
function collision(head,array){
    for(i in array){
        if(head.x==array[i].x&&head.y==array[i].y)
        return true;
    }
    return false;
}
let direction;
document.addEventListener("keydown", (e) => {
    let k = e.keyCode;
    if (k == 37)
        direction = "LEFT";
    else if (k == 38)
        direction = "UP";
    else if (k == 39)
        direction = "RIGHT";
    else if (k == 40)
        direction = "DOWN";
})
let score=0;
function draw() {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)
   
    for (let k in snake) {
        ctx.fillStyle = (k == 0) ? "green" : "white";
        ctx.fillRect(snake[k].x, snake[k].y, box, box);
    }
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction === "LEFT")
        snakeX -= box;
    if (direction === "UP")
        snakeY -= box;
    if (direction === "RIGHT")
        snakeX += box;
    if (direction === "DOWN")
        snakeY += box;
    
    if(food.x==snakeX&&food.y==snakeY)
    {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
}
else
snake.pop();
let newNode = {
    x: snakeX,
    y: snakeY
}
if(collision(newNode,snake)||snakeX<box||snakeX>17*box||snakeY<3*box||snakeY>17*box){
    clearInterval(game);
    alert("Game Over")
}
snake.unshift(newNode);
ctx.fillStyle='white';
ctx.font="45px Change one";
ctx.fillText(score,2*box,1.6*box);
}
let game = setInterval(draw, 500);
