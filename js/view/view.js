const MAPSET = {
  CANVAS_WIDTH : 500,
  CANVAS_HEIGHT : 1000,
  CANVAS_BACKGROUND : '#000',
  ROW_NUMBERS : 20,
  COLUMNS_NUMBERS : 10,
  PADDING : 2,
  get fieldWidth () {
    return this.CANVAS_WIDTH / this.COLUMNS_NUMBERS; // fieldWidth
  },
  get fieldHeight () {
    return this.CANVAS_HEIGHT / this.ROW_NUMBERS; // fieldHeight
  },
}

const canvas = {
  canvas : document.querySelector('canvas'),
  get width() {
    return this.canvas.width; // Получаем ширину из DOM-элемента
  },
  set width(value) {
    this.canvas.width = value; // Устанавливаем ширину для DOM-элемента
  },
  get height() {
    return this.canvas.height; // Получаем высоту из DOM-элемента
  },
  set height(value) {
    this.canvas.height = value; // Устанавливаем высоту для DOM-элемента
  },
  get context () {
    return this.canvas.getContext('2d'); // Для отрисовки , не является DOM эл.
  },
}

// Ф-ция устанавливает размеры canvas
const setCanvasSize = function (size) {
  canvas.width = size.width;
  canvas.height = size.height;

  return size;
}


// Ф-ция очищает поле
const clearCanvas = function () {
  const { CANVAS_BACKGROUND, CANVAS_WIDTH, CANVAS_HEIGHT } = MAPSET;
  canvas.context.fillStyle = CANVAS_BACKGROUND;
  canvas.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Ф-ция закрашивает точку поля
const drawField = function (x, y, color) {
  const { fieldWidth, fieldHeight, PADDING } = MAPSET;
  canvas.context.fillStyle = color;
  canvas.context.fillRect(
    x * fieldWidth + PADDING, 
    y * fieldHeight + PADDING, 
    fieldWidth - PADDING * 2, 
    fieldHeight - PADDING * 2);
}

// Ф-ция возвращает карту всех клеток поля, матрицу, 'массив массивовэ
const getMap = function () {
  const map = [];

  // Обходим каждый ряд поля
  for (let y = 0; y < MAPSET.ROW_NUMBERS; y++) {
    const row = [];

    // В ряду обходим каждую клетку поля
    for (let x = 0; x < MAPSET.COLUMNS_NUMBERS; x++) {
      // Добавляем в ряд значение NULL => т.е. создаем клетки
      row.push(null);
    }

    // Добавляем ряд в карту
    map.push(row);
  }

  return map;
}

// Ф-ция будет отрисовывать состояние map, всё что в неё есть
const drawState = function (map) {

  // Обходим каждый ряд
  for ( let y = 0; y < MAPSET.ROW_NUMBERS; y++) {
    // Обходим каждую клетку в ряду
    for ( let x = 0; x < MAPSET.COLUMNS_NUMBERS; x ++) {

      // Получаем значение матрицы по координатам x и y
      const field = map[y][x];

      // Если есть поле (не null) 
      if (field) {
        // рисуем клетку 
        drawField(x, y, field);
      }
    }
  }

  return map;
}


export { MAPSET, canvas, clearCanvas, drawField, getMap, drawState, setCanvasSize };