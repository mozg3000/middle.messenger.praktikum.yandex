export const  isFunction = function (x: unknown): x is Function {
  return Object.prototype.toString.call(x) === '[object Function]';
}
