import { LinearGradient } from "./linearGradient";
import { clamp } from "./math";

export class LinearGradientAnimator {
  private readonly element: HTMLElement;
  private readonly from: LinearGradient;
  private readonly to: LinearGradient;
  private readonly duration: number;
  private readonly easing: (progress: number) => number;
  private frameId: number | null = null;
  private progress: number = 0;

  constructor(
    element: HTMLElement,
    {
      from,
      to,
      duration,
      easing = (progress) => progress,
    }: {
      from: LinearGradient;
      to: LinearGradient;
      duration: number;
      easing?: (x: number) => number;
    }
  ) {
    this.element = element;
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.easing = easing;
  }

  public play() {
    if (this.frameId === null) {
      this.requestFrame();
    }
  }

  public seek(progress: number) {
    this.progress = this.easing(clamp(progress, 0, 1));
    requestAnimationFrame(() => {
      this.element.style.background = this.from.interpolate(this.to, this.progress).css();
    });
  }

  public pause() {
    this.cancelFrame();
  }

  private requestFrame(prevTimestamp?: number) {
    this.frameId = requestAnimationFrame((timestamp) => this.animate(timestamp, prevTimestamp));
  }

  private cancelFrame() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private animate(timestamp: number, prevTimestamp?: number) {
    this.progress = this.easing(
      clamp(this.progress + (prevTimestamp ? timestamp - prevTimestamp : 0) / this.duration, 0, 1)
    );

    this.element.style.background = this.from.interpolate(this.to, this.progress).css();

    if (this.progress < 1) {
      this.requestFrame(timestamp);
    }
  }
}
