import {defineComponent, ExtractPropTypes,
  ref, InjectionKey, reactive,computed,
  onMounted, CSSProperties
} from 'vue'

// Utils
import {createNamespace} from "../utils/create";
import {makeNumericProp, numericProp, truthProp} from "../utils";

// Types
import {SwipeProvide} from "./types";
import {useChildren} from "../hook/use-children";

const [name, bem] = createNamespace('swipe');

const swipeProps = {
  loop: truthProp,
  width: numericProp,
  height: numericProp,
  vertical: Boolean,
  autoplay: makeNumericProp(0),
  duration: makeNumericProp(500),
  touchable: truthProp,
  lazyRender:Boolean,
  initialSwipe: makeNumericProp(0),
  indicatorColor: String,
  showIndicators: truthProp,
  stopPropagation: truthProp, //是否阻止滑动事件冒泡
}

export type SwipeProps = ExtractPropTypes<typeof swipeProps>;
export const SWIPE_KEY: InjectionKey<SwipeProvide> = Symbol(name)

export default defineComponent({
  name,
  props: swipeProps,
  setup(props, {slots}) {
    const root = ref<HTMLElement>()
    const state = reactive({
      rect: null,
      width:0,
      height:0,
      offset:0,
      active:0,
      swiping:false
    })


    const {children, linkChildren} = useChildren(SWIPE_KEY)

    const count = computed(()=> children.length);

    const size = computed(() => state[props.vertical? 'height': 'width'])

    const trackSize = computed(() => size.value * count.value);

    const initialize = (active = +props.initialSwipe) => {
      if (!root.value){
        return;
      }
      const cb = ()=>{
        const rect = {
          width: root.value!.offsetWidth,
          height: root.value!.offsetHeight
        }
        state.rect = rect;
        state.width = +(props.width?? rect.width);
        state.height = +(props.height?? rect.height);
        if (count.value){
          active = Math.min(count.value -1, active)
        }
        state.active = active;
        console.log(state)
      }
      cb()
    }


    linkChildren({
      props,
      size
    })

    const trackStyle = computed(()=> {
      const style:CSSProperties = {
        transitionDuration: `${props.duration}ms`,
      }
      if (size.value){
        const mainAxis = props.vertical? 'height': 'width';
        const crossAxis = props.vertical? 'width': 'height';
        style[mainAxis] = `${trackSize.value}px`;
        style[crossAxis] = props[crossAxis]? `${props[crossAxis]}px` : '';
      }
      return style
    })

    onMounted(initialize)
    const renderIndicator = () =>(<div>1</div>)
    return () => (
      <div ref={root} class={bem()}>
        <div
          style={trackStyle.value}
          class={bem('track',{vertical: props.vertical})}
        >
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    )
  }
})
