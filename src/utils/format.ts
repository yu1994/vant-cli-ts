import {isDef, isNumeric} from "./validate";
import {CSSProperties} from 'vue'


export function addUnit(val?:string | number):string|undefined {
  if (isDef(val)){
    return isNumeric(val)? `${val}px`: String(val)
  }
  return  undefined
}

export function getSizeStyle(
  originSize?: string | number
): CSSProperties | undefined {
  if (isDef(originSize)){
    const size = addUnit(originSize);
    return {
      width: size,
      height: size
    }
  }
}

export function getZIndexStyle(zIndex?: number | string):CSSProperties {
  const style: CSSProperties = {};
  if (zIndex !== undefined){
    style.zIndex = +zIndex;
  }
  return style
}
