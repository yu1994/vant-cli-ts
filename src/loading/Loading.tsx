import {createNamespace} from "../utils/create";
import { defineComponent, ExtractPropTypes, computed } from 'vue'
import {makeStringProp, numericProp, addUnit, extend, getSizeStyle} from "../utils";

const [name, bem ] = createNamespace('loading');

export type LoadingType = 'circular' | 'spinner'

const loadingProps = {
  size: numericProp,
  type: makeStringProp<LoadingType>('circular'),
  color: String,
  vertical: Boolean,
  textSize: numericProp,
  textColor: String
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>

const SpinIcon: JSX.Element[] = Array(12)
  .fill(null)
  .map((_, index) => <i class={bem('line', String(index + 1))} />);

const CircularIcon = (
  <svg class={bem('circular')} viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20" fill="none" />
  </svg>
);

export default defineComponent({
  name,
  props: loadingProps,
  setup(props, {slots}) {

    const renderText = () => {
      if (slots.default){
        const {textSize, textColor, color} = props;
        return(
          <span class={bem('text')}
          style={{
            fontSize: addUnit(textSize),
            color: textColor?? color
          }}
          >
            {slots.default()}
          </span>
        )
      }
    }

    const spinnerStyle = computed(() => extend({color: props.color}, getSizeStyle(props.size)))
    return () => {
      const {type, vertical} = props;
      return(
        <div class={bem([type, {vertical}])}>
          <span class={bem('spinner', type)} style={spinnerStyle.value}>
            {type === 'spinner'? SpinIcon: CircularIcon}
          </span>
          {renderText()}
        </div>
      )
    }
  }
})
