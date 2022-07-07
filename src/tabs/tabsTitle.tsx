import {defineComponent, computed, CSSProperties} from 'vue'
import {createNamespace} from "../utils/create";

// Utils
import {isDef, numericProp, truthProp} from "../utils";

const [name, bem] = createNamespace('tab');

export default defineComponent({
  name,

  props: {
    id: String,
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: numericProp,
    shrink: Boolean,
    isActive: Boolean,
    disabled: Boolean,
    controls: String,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    showZeroBadge: truthProp,
  },
  setup(props, {slots}) {
    const style = computed(() => {
      const styl: CSSProperties = {};
      const {type, color, disabled, isActive, activeColor, inactiveColor} =
        props;
      const isCard = type === 'card';
      // Card 风格类型
      if (color && isCard) {
        styl.borderColor = color;
        if (!disabled) {
          if (isActive) {
            styl.backgroundColor = color;
          } else {
            styl.color = color;
          }
        }
      }

      // 标题选中颜色 activeColor
      const titleColor = isActive ? activeColor : inactiveColor;
      if (titleColor) {
        styl.color = titleColor;
      }
      return styl
    })
    const renderText = () => {
      const Text = (
        <span class={bem('text', {ellipsis: !props.scrollable})}>
          {slots.title ? slots.title() : props.title}
        </span>
      )
      if (props.dot || (isDef(props.badge) && props.badge !== '')) {
        return ({Text})
      }
      return Text
    }
    return () => (
      <div
        id={props.id}
        role='tab'
        class={[bem([props.type, {
          grow: props.scrollable && !props.shrink,
          active: props.isActive,
          disabled: props.disabled,
          shrink: props.shrink
        }])]}
        style={style.value}
        aria-selected={props.isActive}
        aria-disabled={props.disabled || undefined}
        aria-controls={props.controls}
      >
        {renderText()}
      </div>
    )
  }
})
