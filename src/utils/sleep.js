
module.exports = function (fun, delay) {
  return new Promise(resolve => {
    setTimeout(function () {
        fun();
        resolve();
    }, delay);
  });
};