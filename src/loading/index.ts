

import _Loading from './Loading';
import {withInstall} from "../utils";

export const Loading = withInstall(_Loading)

export default Loading;


export type {LoadingType, LoadingProps} from './Loading'
declare module 'vue'{
  export interface GlobalComponents{
    VanLoading: typeof Loading
  }
}
