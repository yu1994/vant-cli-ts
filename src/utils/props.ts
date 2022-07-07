import type { PropType } from 'vue';

export const truthProp = {
  type: Boolean,
  default: true as const
}

export const unknownProp = null as unknown as PropType<unknown>;

export const numericProp = [Number, String];

export const makeStringProp = <T>(defaultVal: T)=>({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

export const makeNumericProp = <T>(defaultVal: T) =>({
  type: numericProp,
  default: defaultVal
})
