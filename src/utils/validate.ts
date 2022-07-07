
export const isDef = <T>(val:T): val is NonNullable<T>=>
  val !== undefined && val !== null

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);

// 是否是数字的
export const isNumeric = (val: string | number): val is string=>
  typeof val === 'number' || /^\d+(\.\d+)?$/.test(val);

export const inBrowser = typeof window !== 'undefined'
// 是否是ios
export const isIos = ():boolean=>
  inBrowser
    ?/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    :false;
