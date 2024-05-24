import React, { useEffect } from "react";
import p5 from "p5";

const P5sky = () => {
  useEffect(() => {
    const sketch = (p) => {
      let panels = [];
      let index = 0;
      const num = 24;
      let dsize = 0;
      let dsizeRes = 60; // default 50
      let step = 0;
      let done = false;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        dsize = Math.min(p.width, p.height) / dsizeRes;

        for (let i = 0; i < num; i++) {
          panels.push(p.createGraphics(p.width, p.height));
        }
        bufferPanels();
      };

      const bufferPanels = () => {
        for (let i = 0; i < panels.length; i++) {
          updatePanel(i);
        }
        done = true;
      };

      const updatePanel = (panelIndex) => {
        panels[panelIndex].noStroke();
        panels[panelIndex].background("skyblue");
        for (let x = 0; x <= p.width; x += dsize) {
          for (let y = 0; y <= p.height; y += dsize) {
            let r = p.noise(x / (p.width / 2) + step / 200, y / (p.height / 2) + step / 200, step / 200) * 400;
            panels[panelIndex].fill(r, 120, 150, 80);
            panels[panelIndex].ellipse(x, y, 4 * dsize);
          }
        }

        // Speed up the noise animation: default is 1
        step += 0.7;
      };

      p.draw = () => {
        if (done) {
          p.image(panels[index], 0, 0);
          updatePanel(index);
          index = (index + 1) % panels.length;
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        dsize = Math.min(p.width, p.height) / dsizeRes;

        for (let i = 0; i < num; i++) {
          panels[i] = p.createGraphics(p.width, p.height);
          updatePanel(i); // Update each panel to ensure it's rendered correctly
        }
        done = true; // Ensure drawing continues immediately after resizing
      };
    };

    const myp5 = new p5(sketch);

    return () => {
      myp5.remove();
    };
  }, []);

  return <div />;
};

export default P5sky;
