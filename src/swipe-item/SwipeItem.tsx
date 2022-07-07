import { defineComponent, ref,
  CSSProperties,
  computed} from 'vue'
import {createNamespace} from "../utils/create";
import {useParent} from "../hook/use-parent";
import {SWIPE_KEY} from "../swipe/Swipe";

const [name, bem] = createNamespace('swipe-item')

const swipeItemProps = {

}

export default defineComponent({
  name,
  setup(props,{slots}) {

    const {parent, index} = useParent(SWIPE_KEY)

    const style = computed(() => {
      const style: CSSProperties = {};
      const {vertical} = parent.props;
      if (parent.size.value){
        style[vertical? 'height': 'width'] = `${parent.size.value}px`;
      }
      return style
    })

    return ()=> (
      <div class={bem()} style={style.value}>{slots.default?.()}</div>
    )
  }
})
