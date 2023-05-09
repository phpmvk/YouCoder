import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

const PlaceholderItem = () => {
  const Y_AXIS = 1;
  const X_AXIS = 2;
  let b1, b2, c1, c2;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(640, 360).parent(canvasParentRef);

    b1 = p5.color(255);
    b2 = p5.color(0);
    c1 = p5.color('#424242');
    c2 = p5.color(0, 102, 153);

    p5.noLoop();
  };

  const draw = (p5: p5Types) => {
    setGradient(p5, 0, 0, p5.width / 2, p5.height, b1, b2, X_AXIS);
    setGradient(p5, p5.width / 2, 0, p5.width / 2, p5.height, b2, b1, X_AXIS);
    setGradient(p5, 50, 90, 540, 80, c1, c2, Y_AXIS);
    setGradient(p5, 50, 190, 540, 80, c2, c1, X_AXIS);
  };

  const setGradient = (
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
    c1: p5Types.Color,
    c2: p5Types.Color,
    axis: number
  ) => {
    p5.noFill();

    if (axis === Y_AXIS) {
      for (let i = y; i <= y + h; i++) {
        let inter = p5.map(i, y, y + h, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      for (let i = x; i <= x + w; i++) {
        let inter = p5.map(i, x, x + w, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(i, y, i, y + h);
      }
    }
  };

  return (
    <div className="w-auto m-auto">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default PlaceholderItem;
