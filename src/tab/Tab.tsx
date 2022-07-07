import {defineComponent, ExtractPropTypes, ref,
  inject, computed, PropType, CSSProperties} from 'vue'
import {createNamespace} from "../utils/create";
import {extend, numericProp, truthProp, unknownProp} from "../utils";
import {routeProps} from "../hook/use-route";
import {useParent} from "../hook/use-parent";
import {TABS_KEY} from "../tabs/Tabs";

const [name, bem] = createNamespace('tab')

const tabProps = extend({}, routeProps, {
  title: String,
  dot: Boolean,
  badge: numericProp,
  name: numericProp,
  titleStyle: [String, Object] as PropType<string | CSSProperties>,
  titleClass: unknownProp,
  disabled: Boolean,
  showZeroBadge: truthProp,
})
export type TabProps = ExtractPropTypes<typeof tabProps>;

export default defineComponent({
  name,
  props: tabProps,
  setup(props, {slots}) {
    const inited = ref(false);
    const val = inject('tabs');
    const {parent, index} = useParent(TABS_KEY)

    const init = ()=>{
      inited.value = true;
      if (parent.props.lazyRender){
        parent.onRendered(getName(), props.title)
      }

    }

    const getName = ()=> props.name?? index.value;
    const active = computed(()=>{
      console.log(getName(), 'getName()')
      console.log(parent.currentName.value, 'parent.currentName.value')
      const isActive = getName() === parent.currentName.value;
      if (isActive && !inited.value) {
        init()
      }
      return isActive
    })

    return () => {
      const { scrollspy, lazyRender } = parent.props;
      const show = scrollspy || active.value;

      // inited.value 判断是否显示  scrollspy !lazyRender 显示全部
      const shouldRender = inited.value || scrollspy || !lazyRender
      const Content = shouldRender? slots.default?.() : null;

      return (<div
      v-show={show}
      >
        {Content}
      </div>)
    }
  }
})
