import * as model from './model/model.js';
import * as view from './view/view.js';

// Настройка размеров canvas
const canvasSize = view.setCanvasSize( {width : 500, height : 750} );

// Получаем матрицу карты
const map = view.getMap();
console.log(map[0][0] = 'green');
console.log(map[4][8] = 'red');

// Отрисовываем состояние карты
view.drawState(map);
console.log(view.drawState(map));
