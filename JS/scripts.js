const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
console.log(ctx)

// Let's divide our canvas into 10 by 10 small squares / Griding

const scale = 20
const rows = canvas.height / scale
const columns = canvas.width / scale

// Let's Build our snake

let snake = []
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
}
let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
}

//Call our draw function every 100ms

let playGame = setInterval(draw, 100)

//Let's write a funtion that changes the direction of the snake

let d = 'right'

document.onkeydown = direction

function direction(event) {
  let key = event.keyCode
  if (key == 37 && d != 'right') {
    d = 'left'
  } else if (key == 38 && d != 'down') {
    d = 'up'
  } else if (key == 39 && d != 'left') {
    d = 'right'
  } else if (key == 40 && d != 'up') {
    d = 'down'
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  //Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = 'red'
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale)
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale)
  }
  //Draw the snake
  ctx.fillStyle = '#fff'
  ctx.strokeStyle = 'pink'
  ctx.fillRect(snake[0].x, snake[0].y, scale, scale)
  ctx.strokeRect(snake[0].x, snake[0].y, scale, scale)

  //Draw the food
  ctx.fillStyle = '#ff0'
  ctx.strokeStyle = 'green'
  ctx.fillRect(food.x, food.y, scale, scale)
  ctx.strokeRect(food.x, food.y, scale, scale)

  //old head position
  let snakeX = snake[0].x
  let snakeY = snake[0].y
  //which direction
  if (d == 'left') snakeX -= scale
  if (d == 'up') snakeY -= scale
  if (d == 'right') snakeX += scale
  if (d == 'down') snakeY += scale

  if (snakeX > canvas.width) {
    snakeX = 0
  }
  if (snakeY > canvas.height) {
    snakeY = 0
  }
  if (snakeX < 0) {
    snakeX = canvas.width
  }
  if (snakeY < 0) {
    snakeY = canvas.height
  }

  //Eating the food lets the snake grow
  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    }
    //we Don't remove the tail
  } else {
    // Else we remove the tail
    snake.pop()
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  if (eastself(newHead, snake)) {
    clearInterval(playGame)
    alert('GAME OVER')
  }

  snake.unshift(newHead)
}

// check if snake is eating itself
function eastself(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true
    }
  }
  return false
}
