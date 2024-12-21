<div align="center">
  <h1>animate-linear-gradient</h1>
  <p>Simply animate linear-gradient css background</p>
  <img src="https://github.com/user-attachments/assets/f861e506-20b0-4614-827e-1d719aa5d8fe" alt="" width="400" height="238" />
</div>

## Install

```
$ npm install animate-linear-gradient
```

## Usage

### Linear Gradient

```typescript
import { LinearGradient, RGB } from "animate-linear-gradient";

const from = new LinearGradient({
  angle: 270,
  colorStops: [
    [new RGB([0, 219, 222], 1), 0],
    [new RGB([252, 0, 255], 1), 1],
  ],
});

// linear-gradient(270deg,rgba(0,219,222,1) 0%,rgba(252,0,255,1) 100%)
from.css();

const to = new LinearGradient({
  angle: 43,
  colorStops: [
    [new RGB([65, 88, 208], 1), 0],
    [new RGB([200, 80, 192], 1), 0.46],
    [new RGB([255, 204, 112], 1), 1],
  ],
});

// linear-gradient(43deg,rgba(65,88,208,1) 0%, rgba(200,80,192,1) 46, rgba(255,204,112,1) 100%)
to.css();
```

![](https://github.com/user-attachments/assets/0f92c4eb-9ebb-4d69-9cb2-8a4a15fbc036)

### Interpolation

```typescript
import { LinearGradient, RGB } from "animate-linear-gradient";

const from = new LinearGradient({
  angle: 270,
  colorStops: [
    [new RGB([0, 219, 222], 1), 0],
    [new RGB([252, 0, 255], 1), 1],
  ],
});

const to = new LinearGradient({
  angle: 43,
  colorStops: [
    [new RGB([65, 88, 208], 1), 0],
    [new RGB([200, 80, 192], 1), 0.46],
    [new RGB([255, 204, 112], 1), 1],
  ],
});

from.interpolate(to, 0.5).css();
```

![](https://github.com/user-attachments/assets/7f879a26-ceb5-4bd4-b612-7993b394f945)

### Animate

```typescript
import { LinearGradientAnimator, LinearGradient, RGB } from "animate-linear-gradient";

const from = new LinearGradient({
  angle: 270,
  colorStops: [
    [new RGB([0, 219, 222], 1), 0],
    [new RGB([252, 0, 255], 1), 1],
  ],
});

const to = new LinearGradient({
  angle: 43,
  colorStops: [
    [new RGB([65, 88, 208], 1), 0],
    [new RGB([200, 80, 192], 1), 0.46],
    [new RGB([255, 204, 112], 1), 1],
  ],
});

const animator = new LinearGradientAnimator(element, {
  from,
  to,
  duration: 2000,
});
animator.play();
```

https://github.com/user-attachments/assets/3effec51-724a-49e6-a201-bac684a1ccae

### Animate With Easing

```typescript
import { LinearGradientAnimator, LinearGradient, RGB } from "animate-linear-gradient";

const from = new LinearGradient({
  angle: 270,
  colorStops: [
    [new RGB([0, 219, 222], 1), 0],
    [new RGB([252, 0, 255], 1), 1],
  ],
});

const to = new LinearGradient({
  angle: 43,
  colorStops: [
    [new RGB([65, 88, 208], 1), 0],
    [new RGB([200, 80, 192], 1), 0.46],
    [new RGB([255, 204, 112], 1), 1],
  ],
});

function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

const animator = new LinearGradientAnimator(element, {
  from,
  to,
  duration: 2000,
  easing: easeInOutQuart,
});
animator.play();
```

https://github.com/user-attachments/assets/96109141-e39c-44fa-a5bf-8c83c57ac88b

### Seek

```typescript
import { LinearGradientAnimator, LinearGradient, RGB } from "animate-linear-gradient";

const from = new LinearGradient({
  angle: 270,
  colorStops: [
    [new RGB([0, 219, 222], 1), 0],
    [new RGB([252, 0, 255], 1), 1],
  ],
});

const to = new LinearGradient({
  angle: 43,
  colorStops: [
    [new RGB([65, 88, 208], 1), 0],
    [new RGB([200, 80, 192], 1), 0.46],
    [new RGB([255, 204, 112], 1), 1],
  ],
});

const animator = new LinearGradientAnimator(element, {
  from,
  to,
  duration: 2000,
});
animator.seek(0.5);
```

https://github.com/user-attachments/assets/9e09e805-95af-4216-a380-451fc1c2bdfe
