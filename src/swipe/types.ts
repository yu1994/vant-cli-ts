import {ComputedRef} from 'vue'
import {SwipeProps} from "./Swipe";

export type SwipeProvide = {
  props: SwipeProps,
  size: ComputedRef<number>
}
