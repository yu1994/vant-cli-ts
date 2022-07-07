import {nextTick, onMounted, onActivated} from 'vue'

export function useMountedOrActivated(hook:()=> any) {
  let mounted: Boolean;

  onMounted(()=>{
    hook();
    nextTick(()=>{
      mounted = true
    })
  })
  onActivated(()=>{
    if (mounted){
      hook();
    }
  })
}
