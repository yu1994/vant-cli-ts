export const extend = Object.assign;
export function noop() {}


export type Writeable<T> = { [P in keyof T]: T[P]};

export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce((ret, key)=>{
    if (!ignoreUndefined || obj[key] !== undefined){
      ret[key] = obj[key]
    }
    return ret
  }, {} as Writeable<Pick<T, U>>)
}
