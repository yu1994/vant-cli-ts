import {
  defineComponent, PropType, ExtractPropTypes, ref,
  InjectionKey,
  reactive,
  computed,
  CSSProperties,
  ComponentPublicInstance,
  nextTick,
  watch
} from 'vue'
import {createNamespace} from "../utils/create";
// Utils
import {
  Interceptor, makeNumericProp, makeStringProp,
  numericProp, BORDER_TOP_BOTTOM, isDef, pick, truthProp, callInterceptor, addUnit
} from "../utils";
import {scrollLeftTo} from "./utils";

// Types
import {TabsType} from "./types";
import {TabsProvide} from "./types";

// Composables
import {useChildren} from "../hook/use-children";
import {useId} from "../hook/use-id";

// Components
import TabsTitle from './TabsTitle';
import {useMountedOrActivated} from "../hook/use-mounted-or-activated";
import {useRefs} from "../hook/use-refs";

const [name, bem] = createNamespace('tabs')

const tabsProps = {
  type: makeStringProp<TabsType>('line'),
  color: String, // 标签主题颜色
  background: String,
  border: Boolean,
  sticky: Boolean,
  active: makeNumericProp(0),
  duration: makeNumericProp(0.3),
  animated: Boolean, // 是否开启切换标签内容的转场动画
  ellipsis: Boolean,
  shrink: Boolean,
  swipeable: Boolean,
  lazyRender: truthProp,
  scrollspy: Boolean,
  offsetTop: makeNumericProp(0),
  lineWidth: numericProp,
  lineHeight: numericProp,
  beforeChange: Function as PropType<Interceptor>,
  swipeThreshold: makeNumericProp(5),
  titleActiveColor: String,
  titleInactiveColor: String,
}
export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const TABS_KEY: InjectionKey<TabsProvide> = Symbol(name)
export default defineComponent({
  name,
  props: tabsProps,
  emits:['update:active', 'change', 'rendered', 'disabled','click-tab'],
  setup(props, {slots, emit}) {
    const root = ref<HTMLElement>()
    const wrapRef = ref<HTMLElement>()
    const navRef = ref<HTMLElement>()
    const [titleRefs, setTitleRefs] = useRefs<ComponentPublicInstance<{},any>>()

    const id = useId();
    const state = reactive({
      inited: false,
      position: '',
      lineStyle: {} as CSSProperties,
      currentIndex: -1,
    })

    const {children, linkChildren} = useChildren(TABS_KEY)
    const navStyle = computed(() => ({
      borderColor: props.color,
      background: props.background
    }))
    const onRendered = (name: string | number, title?:string) =>{
      emit('rendered',name, title)
    }
    const setLine = ()=> {
      const shouldAnimate = state.inited;
      nextTick(() =>{
        const titles = titleRefs.value;
        if (!titles || !titles[state.currentIndex] || props.type !== 'line'){
          return false
        }
        const title = titles[state.currentIndex].$el;
        const {lineWidth, lineHeight}= props;
        const left = title.offsetLeft + title.offsetWidth/2;
        const lineStyle:CSSProperties = {
          width: addUnit(lineWidth),
          backgroundColor: props.color,
          transform: `translateX(${left}px) translateX(-50%)`
        }
        if (shouldAnimate){
          lineStyle.transitionDuration = `${props.duration}s`;
        }
        if (isDef(lineHeight)) {
          const height = addUnit(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }
        state.lineStyle = lineStyle;
      })
    }
    const scrollIntoView = (immediate?: boolean)=> {
      const nav = navRef.value;
      const titles = titleRefs.value;

      if (!scrollable.value || !nav || !titles || !titles[state.currentIndex]) {
        return;
      }

      const title = titles[state.currentIndex].$el;
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
    }


    const currentName = computed(() => {
      const activeTab = children[state.currentIndex];
      console.log(activeTab, 'activeTab')
      console.log(state.currentIndex, 'state.currentIndex')
      if (activeTab) {
        return getTabName(activeTab, state.currentIndex)
      }
    })

    linkChildren({
      id,
      props,
      setLine,
      onRendered,
      currentName,
      scrollIntoView
    })

    const scrollable = computed(() =>
      children.length > props.swipeThreshold ||
      !props.ellipsis || props.shrink
    )

    watch(()=> state.currentIndex,()=> {
      scrollIntoView()
      setLine()
    })

    const findAvailableTab = (index: number) => {
      const diff = index < state.currentIndex ? -1 : 1;
      // 这里的作用是 当 active 为 disabled 禁用时 自动选择下一个
      while (index >= 0 && index < children.length) {
        if (!children[index].disabled) {
          return index
        }
        index += diff;
      }
    }
    const getTabName = (tab: ComponentPublicInstance<{}, any>, index: number): number | string => tab.name ?? index;
    const setCurrentIndexByName = (name: number | string) => {
      const matched = children.find((tab, index) => getTabName(tab, index) === name)
      const index = matched ? children.indexOf(matched) : 0;
      setCurrentIndex(index)
    }
    const setCurrentIndex = (currentIndex: number) => {
      const newIndex = findAvailableTab(currentIndex);
      if (!isDef(newIndex)) {
        return;
      }
      const newTab = children[newIndex];
      const newName = getTabName(newTab, newIndex);
      const shouldEmitChange = state.currentIndex !== null;

      state.currentIndex = newIndex;
      if (newName !== props.active){
        emit('update:active', newName)
        if (shouldEmitChange) {
          emit('change', newName, newTab.title)
        }
      }
    }
    const scrollToCurrentContent = ()=> {

    }
    const onClickTab = (item: ComponentPublicInstance<{},any>,index: number, event:MouseEvent) => {
      const {title, disabled} = children[index];
      const name = getTabName(item,index)
      if (disabled){
        emit('disabled', name, title)
      } else {
        callInterceptor(props.beforeChange, {
          args:[name],
          done() {
            setCurrentIndex(index)
            scrollToCurrentContent()
          }
        })
        emit('click-tab',{
          name,
          title,
          event,
          disabled
        })
      }
    }
    const renderNav = () => children.map((item, index) => (
      <TabsTitle
        v-slots={{title: item.$slots.title}}
        id={`${id}-${index}`}
        ref={setTitleRefs(index)}
        type={props.type}
        color={props.color}
        style={item.titleStyle}
        class={item.titleClass}
        shrink={props.shrink}
        controls={item.id}
        scrollable={scrollable.value}
        isActive={state.currentIndex === index}
        activeColor={props.titleActiveColor}
        inactiveColor={props.titleInactiveColor}
        onClick={(event: MouseEvent)=> onClickTab(item, index, event)}
        {...pick(item, ['title', 'dot', 'badge', 'disabled'])}
      />
    ))
    const renderLine = () =>{
      if (props.type === 'line' && children.length){
        return <div class={bem('line')} style={state.lineStyle}/>
      }
    }
    const renderHeader = () => {
      const {type, border} = props;
      return (<div
        ref={wrapRef}
        class={[bem('wrap'), {[BORDER_TOP_BOTTOM]: type === 'line' && border}]}>
        <div
          ref={navRef}
          class={bem('nav', [
            type,
            {shrink: props.shrink, complete: scrollable.value}
          ])}
          style={navStyle.value}>
          {slots['nav-left']?.()}
          {renderNav()}
          {renderLine()}
          {slots['nav-right']?.()}
        </div>

      </div>)
    }
    const init = () => {
      setCurrentIndexByName(props.active);
      nextTick(() => {
        state.inited = true;
      })
    }
    useMountedOrActivated(init)
    return () => (
      <div ref={root} class={bem([props.type])}>
        {props.sticky ? (<div>1</div>) : ([renderHeader(), slots['nav-bottom']?.()])}
        {slots.default?.()}
      </div>
    )
  }
})
