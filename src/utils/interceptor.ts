import {isPromise} from "./validate";
import { noop } from './basic';

export type Interceptor = (...args: any[])=> Promise<boolean> | boolean | undefined | void;

export function callInterceptor(
  interceptor: Interceptor | undefined,
  {
    args = [],
    done,
    canceled
  }:{
    args?: unknown[];
    done: ()=>void;
    canceled?: ()=>void;
  }
) {
  console.log(interceptor)
    if (interceptor){
      const returnVal = interceptor.apply(null, args)
      console.log(returnVal)
      if (isPromise(returnVal)){
        returnVal
          .then((value) => {
            if (value) {
              done();
            } else if (canceled) {
              canceled();
            }
          })
          .catch(noop);
      }else if (returnVal){
        done()
      }else if (canceled){
        canceled()
      }
    } else {
      done()
    }
}
