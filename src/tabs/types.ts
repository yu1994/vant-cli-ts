
import type { ComponentPublicInstance, ComputedRef } from 'vue';
import type { TabsProps } from './Tabs';

export type TabsType = 'line' | 'card';
export type TabsProvide = {
  id: string;
  props: TabsProps;
  setLine: () => void;
  onRendered: (name: string | number, title?: string) => void;
  scrollIntoView: (immediate?: boolean) => void;
  currentName: ComputedRef<number | string | undefined>;
};
