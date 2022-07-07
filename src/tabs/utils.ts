import {inBrowser} from "../utils";

export function raf(fn: FrameRequestCallback):number {
  return inBrowser? requestAnimationFrame(fn): -1;
}

export function scrollLeftTo(
  scroller: HTMLElement,
  to: number,
  duration: number
) {
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);

  function animate() {
    scroller.scrollLeft += (to - from) / frames;
    if (++count < frames) {
      raf(animate);
    }
  }

  animate();
}
