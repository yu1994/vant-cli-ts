import {defineComponent, ExtractPropTypes, CSSProperties, PropType} from 'vue';
import {extend, numericProp, makeStringProp} from '../utils'
import {routeProps} from "../hook/use-route";
import {createNamespace} from "../utils/create";

// Components

import { Loading } from '../loading'

// Types
import {
  ButtonType,
  ButtonSize,
  ButtonNativeType,
  ButtonIconPosition
} from './types';
import {LoadingType} from "../loading/Loading";
import {useRoute} from "../hook/use-route";

const [name, bem] = createNamespace('button');

const buttonProps = extend({}, routeProps, {
  tag: makeStringProp<keyof HTMLElementTagNameMap>('button'),
  nativeType: makeStringProp<ButtonNativeType>('button'),
  type: makeStringProp<ButtonType>('default'),
  size: makeStringProp<ButtonSize>('normal'),
  color:String,
  block: Boolean,
  round:Boolean,
  square: Boolean,
  plain: Boolean,
  text: String,
  loading: Boolean,
  icon: String,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  loadingText: String,
  loadingType: String as PropType<LoadingType>,
  loadingSize: numericProp,
  iconPosition: makeStringProp<ButtonIconPosition>('left'),
})

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export default defineComponent({
  name,
  props: buttonProps,
  emits: ['click'],
  setup(props,{ emit, slots }) {
    const route = useRoute();
    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        event.preventDefault()
      } else if (!props.disabled) {
        console.log('11')
        emit('click',event);
        route()
      }
    }
    const renderText = () => {
      let text;
      if (props.loading) {
        text = props.loadingText
      } else {
        text = slots.default? slots.default() : props.text;
      }
      if (text) {
        return <span class={bem('text')}>{text}</span>
      }
    }
    const renderLoadingIcon = () =>{
      if (slots.loading){
        return slots.loading()
      }
      return (<Loading
      type={props.loadingType}
      size={props.loadingSize}
      class={bem('loading')}
      />)
    }
    const renderIcon = () => {
      if (props.loading){
        return renderLoadingIcon()
      }
    }
    const getStyle = () => {
      const {color, plain } = props;
      if (color) {
        const style:CSSProperties = {
          color: plain? color: 'white'
        }
        if (!plain) {
          style.background = color;
        }
        if (color.includes('gradient')) {
          style.border = 0
        } else {
          style.borderColor = color
        }
        return style
      }
    }
    return () => {
      const {
        tag,
        disabled,
        nativeType,
        plain,
        type,
        size,
        block,
        round,
        square,
        loading,
        hairline,
        iconPosition,

      } = props;
      const classes = [
        bem([type, size, {plain, block, round, square, loading, disabled, hairline}])
      ]
      return(
        <tag
          class={classes}
          style={getStyle()}
          type={nativeType}
          disabled={disabled}
          onClick={onClick}>
          <div class={bem('content')}>
            {iconPosition === 'left' && renderIcon()}
            {renderText()}
          </div>
        </tag>
      )
    }
  }
})
