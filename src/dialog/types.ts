import {TeleportProps, CSSProperties} from 'vue'
import {Interceptor} from "../utils";

export type DialogTheme = 'default' | 'round-button';
export type DialogAction = 'confirm' | 'cancel';
export type DialogMessage = string | (()=> JSX.Element)
export type DialogMessageAlign = 'left' | 'center' | 'right';


export type DialogOptions = {
  title?: string;
  width?: number | string;
  message: DialogMessage;
  overlay?: boolean; // 是否展示遮罩层
  teleport?: TeleportProps['to']; // 指定挂在节点
  className?: unknown;
  lockScroll?: boolean;
  transition?: string;
  beforeClose?: Interceptor;
  messageAlign?: DialogMessageAlign;
  overlayClass?: string;
  overlayStyle?: CSSProperties;
  closeOnPopstate?: boolean;  // 是否在页面回退前自动关闭
  cancelButtonText?: string;
  cancelButtonColor?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  closeOnClickOverlay?: boolean; // 是否在点击遮罩层后关闭弹窗
}

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $dialog: typeof Dialog;
//   }
// }
