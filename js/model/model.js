// Ф-ция запускает tick , создаётся цикл
const start = function (tick, actions) {
  const wrappedTick = function (timestamp) {
    tick(timestamp, actions); // Передаём timestamp и actions в tick
    requestAnimationFrame(wrappedTick); // Рекурсивно вызываем wrappedTick
  };
  requestAnimationFrame(wrappedTick); // Запускаем первый кадр
}


// Ф-ция непрерывно совершает действия 
const tick = function (timestamp, actions) {
  actions.forEach( action => {
    action(timestamp); // Передаём timestamp в каждое действие
  });
  // requestAnimationFrame(tick);
}


export { start, tick };
