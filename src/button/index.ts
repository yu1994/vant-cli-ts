import { withInstall } from '../utils';
import _Button from './Button';



console.log(withInstall(_Button))
export const Button = withInstall(_Button);
export default Button;

export type { ButtonProps } from './Button';

export type { ButtonType,ButtonNativeType,ButtonSize,ButtonIconPosition } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VanButton: typeof Button;
  }
}
