import {
  defineComponent,
  reactive,
  PropType,
  ExtractPropTypes
} from 'vue'

//  Utils
import {createNamespace} from "../utils/create";
import {extend, isFunction, pick, BORDER_TOP, BORDER_LEFT, addUnit} from "../utils";
import {sharedProps, popupSharedPropKeys} from '../popup/shared';
import {numericProp, unknownProp, truthProp, makeStringProp} from "../utils";

// Types
import {DialogTheme, DialogAction, DialogMessage, DialogMessageAlign} from "./types";

// Component
import Popup from "../popup";
import Button from "../button/Button";

const [name, bem] = createNamespace('dialog')

const dialogProps = extend({}, sharedProps, {
  title: String,
  theme: String as PropType<DialogTheme>,
  width: numericProp,
  message: [String, Function] as PropType<DialogMessage>,
  callback: Function as PropType<(action?: DialogAction) => void>,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp('van-dialog-bounce'),
  messageAlign: String as PropType<DialogMessageAlign>,
  closeOnPopstate: truthProp,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  confirmButtonText: String,
  confirmButtonColor: String,
  showConfirmButton: truthProp,
  closeOnClickOverlay: Boolean,
})
console.log(dialogProps, 'dialogProps')
export type DialogProps = ExtractPropTypes<typeof dialogProps>
const popupInheritKeys = [
  ...popupSharedPropKeys,
  'transition',
  'closeOnPopstate'
] as const;

export default defineComponent({
  name,
  props: dialogProps,

  emits: ['cancel', 'confirm', 'update:show'],

  setup(props, {emit, slots}) {

    const updateShow = (value) => emit('update:show', value);

    const close=(action: DialogAction)=>{
      updateShow(false);
      props.callback?.(action)
    }

    const loading = reactive({
      confirm: false,
      cancel: false
    })
    const getActionHandle = (action:DialogAction)=>()=>{
      if (!props.show){
        return false
      }
      emit(action);
      if (props.beforeClose){

      } else {
        close(action)
      }

    }
    const onCancel = getActionHandle('cancel');
    const onConfirm = getActionHandle('confirm');

    const renderButtons = () => {
      return (
        <div class={[BORDER_TOP, bem('footer')]}>
          {props.showCancelButton && (
            <Button
              size="large"
              text={props.cancelButtonText || '取消'}
              class={bem('cancel')}
              style={{color: props.cancelButtonColor}}
              loading={loading.cancel}
              onClick={onCancel}
            />
          )}
          {props.showConfirmButton && (
            <Button
              size='large'
              text={props.confirmButtonText || '确定'}
              class={[bem('confirm'), {[BORDER_LEFT]: props.showCancelButton}]}
              style={{color: props.cancelButtonColor}}
              loading={loading.confirm}
              onClick={onConfirm}
            />
          )}
        </div>
      )
    }
    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;
      if (title) {
        return (
          <div class={bem('header', {
            isolated: !props.message && !slots.default
          })}>
            {{title}}
          </div>
        )
      }
    }
    const renderMessage = (hasTitle: boolean) => {
      const {message, allowHtml, messageAlign} = props;
      const classNames = bem('message', {
        'has-title': hasTitle,
        [messageAlign as string]: messageAlign
      });
      const content = isFunction(message) ? message() : message;
      if (allowHtml && typeof content === 'string') {
        return <div class={classNames} innerHTML={content}/>
      }
      return <div class={classNames}>{content}</div>
    }
    const renderContent = () => {
      if (slots.default) {
        return (<div class={bem('content')}>{slots.default()}</div>)
      }
      const {title, message, allowHtml} = props;
      if (message) {
        // 是否有标题
        const hasTitle = !!(title || slots.title);
        return (
          <div
            key={allowHtml ? 1 : 0}
            class={bem('content', {isolated: hasTitle})}>
            {renderMessage(hasTitle)}
          </div>
        )
      }

    }
    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer()
      }
      return props.theme === 'round-button' ? renderButtons() : renderButtons();
    }
    return () => {
      const { width, title, theme, message, className } = props;
      return (
        <Popup
          class={[bem([theme]), className]}
          role='dialog'
          style={{width: addUnit(width)}}
          tabindex={0}
          aria-labelledby={title || message}
          {...pick(props, popupInheritKeys)}
          onUpdate:show={updateShow}>
          {renderTitle()}
          {renderContent()}
          {renderFooter()}
        </Popup>
      )
    }
  }
})
