const MAPSET = {
  CANVAS_WIDTH : 375,
  CANVAS_HEIGHT : 750,
  CANVAS_BACKGROUND : '#fff',
  ROW_NUMBERS : 20,
  COLUMNS_NUMBERS : 10,
  PADDING : 2,
  block : getBlock(1),
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

const elements = {
  body : document.body
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
  canvas.context.strokeStyle = 'black';

  canvas.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.context.fill();
  canvas.context.stroke();
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

// Ф-цтя рисует блок
const drawBlock = function () {
  
  // Запрашиваем части блока, кот. нужно отобразить
  const parts = MAPSET.block.getIncludedParts();

  // Перебираем объекты массива parts
  for ( const part of parts) {
    // Передаем ф-ции координаты и цвет частицы
    drawField( part.x, part.y, MAPSET.block.color)
  }
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

// Ф-ция получает 4 аргумента: тип блока. цвет, координаты
function getBlock (type, color = 'black', x = 4, y = 0) {

  // Создаём блок
  const block = { type, x, y, color }

  //
  block.getIncludedParts = function () {
    if (block.type === 1) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [
        { x : block.x, y : block.y },
        { x : block.x + 1, y : block.y },
        { x : block.x, y : block.y + 1 },
        { x : block.x + 1, y : block.y + 1 },
      ]
    }
  }

  block.getNextBlock = function () {
    if (block.type === 1) {
      return getBlock ( block.type, block.color, block.x, block.y);
    }
  }

  block.getCopy = function () {
    return getBlock ( block.type, block.color, block.x, block.y);
  }

  return block;
}

// Ф-ция непрерывно совершает действия 
const tick = function (timestamp, map) {
  clearCanvas(); 
  drawBlock(); // Рисуем блок
  drawState(map)
  // requestAnimationFrame(tick);
}

// Ф-ция позволяет перемещать блок клваишам WASD
const moveBlock = function (e) {
  if (e.code === 'KeyA') {
    MAPSET.block.x = MAPSET.block.x - 1;
  }

  if (e.code === 'KeyD') {
    MAPSET.block.x = MAPSET.block.x + 1;
  }

  if (e.code === 'KeyW') {
    MAPSET.block.y = MAPSET.block.y - 1;
  }

  if (e.code === 'KeyS') {
    MAPSET.block.y = MAPSET.block.y + 1;
  }
}



export { MAPSET, canvas, elements, clearCanvas, drawField, drawBlock, getMap, drawState, setCanvasSize, getBlock, tick, moveBlock  };