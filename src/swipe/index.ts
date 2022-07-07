import {withInstall} from "../utils";
import _Swiper, { SwipeProps } from "./Swipe";

export const Swipe = withInstall(_Swiper);
export default Swipe;

export type {SwipeProps};

declare module 'vue'{
  export interface GlobalComponents{
    VanSwipe: typeof Swipe
  }
}
