import * as model from './model/model.js';
import * as view from './view/view.js';

// Настройка размеров canvas
const canvasSize = view.setCanvasSize( {width : view.MAPSET.CANVAS_WIDTH, height : view.MAPSET.CANVAS_HEIGHT} );
// Функция запускает прослушивание событий
const startEventListeners = function () {
  view.elements.body.addEventListener('keyup', function (e) {
    view.moveBlock(e);
  });
}
// Ф-ция запускает tick , создаётся цикл
const start = function (tick, map) {
  const wrappedTick = function (timestamp) {
    tick(timestamp, map); // Передаём timestamp и actions в tick
    requestAnimationFrame(wrappedTick); // Рекурсивно вызываем wrappedTick
  };
  requestAnimationFrame(wrappedTick); // Запускаем первый кадр
}


// Получаем матрицу карты
const map = view.getMap();

// Отрисовываем состояние карты
view.drawState(map);

// Запустим ф-цию старт, передаем ей на запуск ф-цию tick и массив действий
start(view.tick, map);

// Слушаем события
startEventListeners();

