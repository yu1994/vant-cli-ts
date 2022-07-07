import { App, ComponentPublicInstance } from 'vue';
import VanDialog from './Dialog';
import {mountComponent, usePopupState} from "../utils/mount-component";
import {extend, inBrowser, withInstall} from "../utils";
import {DialogAction, DialogOptions} from "./types";


type ComponentInstance = ComponentPublicInstance<{}, any>;

let instance: ComponentInstance;

function initInstance() {
  const Wrapper = {
    setup() {
      const {state, toggle } = usePopupState();
      return ()=> <VanDialog {...state} onUpdate:show={toggle} />
    }
  };

  ( { instance } = mountComponent(Wrapper))
}

function Dialog(options: DialogOptions) {
  if (!inBrowser){
    return Promise.resolve()
  }
  return new Promise((resolve, reject)=>{
    if (!instance){
      initInstance()
    }

    instance.open(
      extend({}, Dialog.currentOptions, options,{
        callback:(action: DialogAction)=>{
          (action === 'confirm' ? resolve : reject)(action);
        }
      })
    )
  })
}


Dialog.defaultOptions = {
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  callback: null,
  teleport: 'body',
  className: '',
  allowHtml: false,
  lockScroll: true,
  transition: undefined,
  beforeClose: null,
  overlayClass: '',
  overlayStyle: undefined,
  messageAlign: '',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
};

Dialog.close = ()=>{
  if (instance){
    instance.toggle(false)
  }
}

Dialog.alert = Dialog;
Dialog.currentOptions = extend({}, Dialog.defaultOptions);
Dialog.confirm = (options: DialogOptions) => Dialog(extend({ showCancelButton: true }, options));

Dialog.Component = withInstall(VanDialog)

Dialog.close = ()=>{
  if (instance){
    instance.toggle(false)
  }
}

Dialog.resetDefaultOptions = ()=>{
  Dialog.currentOptions = extend({}, Dialog.defaultOptions)
}

Dialog.setDefaultOptions = (options: DialogOptions)=>{
  extend(Dialog.currentOptions, options)
}

Dialog.install = (app: App)=>{
  app.use(Dialog.Component);
  app.config.globalProperties.$dialog = Dialog;
}


export {
  Dialog
}






