const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 1000;
const CANVAS_BACKGROUND = '#000';

const ROW_NUMBERS = 20;
const COLUMNS_NUMBERS = 10;
const PADDING = 2;

const fieldWidth = CANVAS_WIDTH / COLUMNS_NUMBERS;
const fieldHeight = CANVAS_HEIGHT / ROW_NUMBERS;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d'); // Для отрисовки , не является DOM эл.

const map = getMap();
drawState();

// Размеры листа canvas
canvas.width = 500;
canvas.height = 750;

// Ф-ция очищает поле
const clearCanvas = function () {
  context.fillStyle = CANVAS_BACKGROUND;
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Ф-ция закрашивает точку поля
const drawField = function (x, y, color) {
  context.fillStyle = color;
  context.fillRect(
    x * fieldWidth + PADDING, 
    y * fieldHeight + PADDING, 
    fieldWidth - PADDING * 2, 
    fieldHeight - PADDING * 2);
}

// Ф-ция возвращает карту всех клеток поля, матрицу, 'массив массивовэ
function getMap () {
  const map = [];

  // Обходим каждый ряд поля
  for (let y = 0; y < ROW_NUMBERS; y++) {
    const row = [];

    // В ряду обходим каждую клетку поля
    for (let x = 0; x < COLUMNS_NUMBERS; x++) {
      // Добавляем в ряд значение NULL => т.е. создаем клетки
      row.push(null);
    }

    // Добавляем ряд в карту
    map.push(row);
  }

  return map;
}

// Ф-ция будет отрисовывать состояние map, всё что в неё есть
function drawState() {

  // Обходим каждый ряд
  for ( let y = 0; y < ROW_NUMBERS; y++) {

    // Обходим каждую клетку в ряду
    for ( let x = 0; x < COLUMNS_NUMBERS; x ++) {

      // Получаем значение матрицы по координатам x и y
      const field = map[y][x];

      // Если есть поле (не null) 
      if (field) {
        // рисуем клетку 
        drawField(x, y, field);
      }
    }
  }
}



// console.log(canvas);
