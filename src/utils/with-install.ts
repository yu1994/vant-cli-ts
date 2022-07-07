import {APP} from 'vue'

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};
export type WithInstall<T> = T & {
  install(app: APP):void;
} & EventShim;

export function withInstall<T>(options: T) {
  (options as Record<string, any>).install = (app: APP) => {
    const {name} = options as unknown as { name: string };
    app.component(name, options);
  }
  return options as WithInstall<T>;
}
