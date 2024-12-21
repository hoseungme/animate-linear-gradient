import { clamp, interpolate } from "./math";
import { oklabToRGB, rgbToOklab } from "./space";

export type Coords = [number, number, number];

export class Color {
  public readonly coords: Coords;
  public readonly alpha: number;

  constructor(coords: Coords, alpha: number) {
    this.coords = coords;
    this.alpha = clamp(alpha, 0, 1);
  }

  public interpolate(to: Color, progress: number) {
    return new Color(
      this.coords.map((value, index) => interpolate(value, to.coords[index], progress)) as Coords,
      interpolate(this.alpha, to.alpha, progress)
    );
  }
}

export class RGB extends Color {
  constructor(rgb: Coords, alpha: number) {
    super([clamp(rgb[0], 0, 255), clamp(rgb[1], 0, 255), clamp(rgb[2], 0, 255)], alpha);
  }

  public interpolate(to: RGB, progress: number) {
    const color = super.interpolate(to, progress);
    return new RGB(color.coords, color.alpha);
  }

  public css() {
    return `rgba(${this.coords.join(",")},${this.alpha})`;
  }

  public toOklab() {
    return new Oklab(rgbToOklab(this.coords), this.alpha);
  }
}

export class Oklab extends Color {
  constructor(lab: Coords, alpha: number) {
    super([clamp(lab[0], 0, 1), clamp(lab[1], -0.5, 0.5), clamp(lab[2], -0.5, 0.5)], alpha);
  }

  public interpolate(to: Oklab, progress: number) {
    const color = super.interpolate(to, progress);
    return new Oklab(color.coords, color.alpha);
  }

  public toRGB() {
    return new RGB(oklabToRGB(this.coords), this.alpha);
  }
}
