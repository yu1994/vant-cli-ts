import {
  Transition,
  defineComponent, ExtractPropTypes, PropType,CSSProperties,
  computed
} from 'vue'
import {createNamespace} from "../utils/create";
import {extend, getZIndexStyle, numericProp, truthProp, unknownProp, preventDefault} from "../utils";
import {useLazyRender} from "../hook/use-lazy-render";


const [name, bem] = createNamespace('overlay')
const overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: numericProp, // 动画时长
  className: unknownProp,
  lockScroll: truthProp,
  customStyle: Object as PropType<CSSProperties>,
  lazyRender: truthProp // 是否在显示时在渲染
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export default defineComponent({
  name,
  props: overlayProps,
  setup(props, {slots}){
    const preventTouchMove = (event: TouchEvent)=>{
      preventDefault(event, true)
    }
    const lazyRender = useLazyRender(()=> props.show || !props.lazyRender);
    const renderOverlay = lazyRender(()=>{
      const style: CSSProperties = extend(
        getZIndexStyle(props.zIndex),
        props.customStyle
      );
      if (props.duration){
        style.animationDuration = `${props.duration}s`;
      }
      return (
        <div
          v-show={props.show}
          style={style}
          class={[bem(), props.className]}
          onTouchmove={props.lockScroll? preventTouchMove : ()=>{}}
        >
          {slots.default?.()}
        </div>
      )
    })
   return ()=>(
     <Transition v-slots={{default: renderOverlay}} name="van-fade" appear/>
   )
  }
})
