import { PropType, TeleportProps, CSSProperties} from 'vue'
import {numericProp, Interceptor, unknownProp } from "../utils";

const truthProp = {
  type: Boolean,
  default: true as const
}

export const sharedProps = {
  show: Boolean, // 是否显示
  zIndex: numericProp,
  overlay: truthProp,
  duration: numericProp, // 动画时长
  teleport: [String, Object] as PropType<TeleportProps['to']>,
  lockScroll: truthProp, // 是否锁定背景滚动
  lazyRender: truthProp, // 是否在显示弹层时才渲染节点
  beforeClose: Function as PropType<Interceptor>, // 关闭前的回调函数
  overlayStyle: Object as PropType<CSSProperties>, // 遮罩层自定义样式
  overlayClass: unknownProp,
  transitionAppear: Boolean,
  closeOnClickOverlay: truthProp // 是否点击遮罩层后关闭
}

export type PopupSharedPropKeys = Array<keyof typeof sharedProps>;

export const popupSharedPropKeys = Object.keys(sharedProps) as PopupSharedPropKeys;
