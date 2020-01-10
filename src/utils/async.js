
let sleep = (fun, delay)=> {
  return new Promise(resolve => {
    setTimeout(function () {
        fun();
        resolve();
    }, delay);
  });
};
export {sleep};