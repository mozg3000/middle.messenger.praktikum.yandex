export const  isFunction = function (x: unknown): x is Function {
  return Object.prototype.toString.call(x) === '[object Function]';
}

export function sleep(ms: number = 200) {
  return new Promise(r => setTimeout(r, ms));
}
