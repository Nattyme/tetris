import * as model from './model/model.js';
import * as view from './view/view.js';

// Настройка размеров canvas
const canvasSize = view.setCanvasSize( {width : 500, height : 750} );

// Получаем матрицу карты
const map = view.getMap();
// console.log(map[0][0] = 'green');
// console.log(map[4][8] = 'red');

// Отрисовываем состояние карты
view.drawState(map);
console.log(view.drawState(map));

// Ф-ции, кот нужны выполнить на старте
const startActions = [view.clearCanvas(), view.drawBlock(),  view.drawState()];
// Запустим ф-цию старт, передаем ей на запуск ф-цию tick и массив действий
model.start(model.tick, startActions);

// Передадим в tick функции на выполнение: очистить поле, отрисовать блок, отрисовать состояние
model.tick(timestamp, startActions);

console.log(block);
