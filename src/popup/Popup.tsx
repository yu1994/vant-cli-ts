import {defineComponent, ref, ExtractPropTypes,
  Transition,
  onMounted,
  computed,
  CSSProperties,
  watch,
  Teleport } from 'vue'
import {callInterceptor, extend, isDef, makeStringProp} from "../utils";
import { sharedProps } from "./shared";


// Types
import {PopupPosition, PopupCloseIconPosition} from "./types";
import {createNamespace} from "../utils/create";

// Components
import Overlay from "../overlay/Overlay";
import {useLazyRender} from "../hook/use-lazy-render";

const PopupProps = extend({}, sharedProps, {
  round: Boolean,
  position: makeStringProp<PopupPosition>('center'),
  closeIcon: makeStringProp('cross'),
  closeable: Boolean, // 是否显示关闭按钮
  transition: String, // 动画类名
  iconPrefix: String, // 图标类名前缀
  closeOnPopstate: Boolean, // 是否在页面回退时 自动关闭
  closeIconPosition: makeStringProp<PopupCloseIconPosition>('top-right'),
  safeAreaInsetBottom: Boolean //是否开启底部安全区域适配
})

export type PopupProps = ExtractPropTypes<typeof PopupProps>

const [name, bem] = createNamespace('popup');

let globalZIndex = 2000;


export default defineComponent({
  name,
  inheritAttrs: false,
  props: PopupProps,
  emits: [
    'open',
    'close',
    'closed',
    'keydown',
    'update:show',
    'click-overlay',
    'click-close-icon'
  ],
  setup(props, {emit, attrs, slots}) {
    const zIndex = ref<number>();
    let opened: boolean;

    const style = computed(() =>{
      const style: CSSProperties = {
        zIndex: zIndex.value
      }
      if (isDef(props.duration)){
        const key =
          props.position === 'center'? 'animationDuration' :'transitionDuration';
        style[key] = `${props.duration}s`;
      }
      return style
    })
    const close = () => {
      if (opened){
        callInterceptor(props.beforeClose, {
          done() {
            opened = false;
            emit('close');
            emit('update:show',false)
          }
        })
      }
    }

    const open = ()=>{
      if (!opened){
        if (props.zIndex !== undefined){
          globalZIndex = +props.zIndex
        }
        opened = true;
        zIndex.value = ++globalZIndex;
        emit('open')
      }
    }
    watch(()=> props.show, (news)=>{
      if (news && !opened){
        open()
      }
      if (!news && opened){
        opened = false;
        emit('close')
      }
    })
    onMounted(()=>{
      if (props.show){

      }
    })
    const onClickOverlay =(event: MouseEvent)=>{
      emit('click-overlay');
      if (props.closeOnClickOverlay){
        close()
      }
    };
    const renderOverlay = ()=> {
      console.log(slots['overlay-content'])
      if(props.overlay) {
        return (
          <Overlay
            v-slots={{default: slots['overlay-content']}}
            show={props.show}
            class={props.overlayClass}
            customStyle={props.overlayStyle}
            duration={props.duration}
            zIndex={props.zIndex}
            onClick={onClickOverlay}
          />
        )
      }
    };
    const renderCloseIcon = ()=>{
      if (props.closeable){
        return (<div>1</div>)
      }
    }
    const lazyRender = useLazyRender(()=> props.show || !props.lazyRender);
    const renderPopup = lazyRender(()=>{
      const {round, position, safeAreaInsetBottom} = props;
      return (<div
      v-show={props.show}
      style={style.value}
      class={[
        bem({round, [position]: position}),
        { 'van-safe-area-bottom': safeAreaInsetBottom}
      ]}
        {...attrs}
      >
        {slots.default?.()}
        {renderCloseIcon()}
      </div>)
    });

    const renderTransition = ()=>{
      const {position, transition, transitionAppear} = props;
      const name =
        position === 'center'? 'van-fade': `van-popup-slide-${position}`;
      return (
        <Transition
          v-slots={{default: renderPopup }}
        name={transition || name}
        appear={transitionAppear}

        />
      )
    }
    return ()=>{
      if (props.teleport){
        <Teleport to={props.teleport}>
          {renderOverlay()}
          {renderTransition()}
        </Teleport>
      }
      return(<>
        {renderOverlay()}
        { renderTransition() }
      </>)
    }
  }
})
