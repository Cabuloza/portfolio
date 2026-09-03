const canvas = document.getElementById('donut-canvas');
const ctx = canvas.getContext('2d');

const shades = [
  '#241a0c', '#382812', '#4c3618', '#61441e',
  '#7d5722', '#9a6b26', '#b17a2b', '#c68e30',
  '#d9a635', '#e6bd52', '#f0d078', '#f7e3a8'
];

let A = 0;
let B = 0;

let cols;
let rows;
let fontSize;
let K1;

const R1 = 1;
const R2 = 2;
const K2 = 5;

function resize() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  fontSize = Math.max(
    10,
    Math.floor(window.innerWidth / 140)
  );

  cols = Math.floor(
    canvas.width / (fontSize * 0.6)
  );

  rows = Math.floor(
    canvas.height / fontSize
  );

  K1 = cols * K2 * 0.20 / (R1 + R2);

  ctx.font = `${fontSize}px 'Space Mono', monospace`;
  ctx.textBaseline = 'top';
}

window.addEventListener('resize', resize);
resize();

function frame() {

  ctx.fillStyle = '#111111';
  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const output = new Array(cols * rows).fill(null);
  const zbuffer = new Float32Array(cols * rows);

  const cosA = Math.cos(A);
  const sinA = Math.sin(A);

  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < 6.28; theta += 0.07) {

    const costheta = Math.cos(theta);
    const sintheta = Math.sin(theta);

    for (let phi = 0; phi < 6.28; phi += 0.02) {

      const cosphi = Math.cos(phi);
      const sinphi = Math.sin(phi);

      const circlex =
        R2 + R1 * costheta;

      const circley =
        R1 * sintheta;

      const x =
        circlex *
          (
            cosB * cosphi +
            sinA * sinB * sinphi
          )
        -
        circley * cosA * sinB;

      const y =
        circlex *
          (
            sinB * cosphi -
            sinA * cosB * sinphi
          )
        +
        circley * cosA * cosB;

      const z =
        K2 +
        cosA * circlex * sinphi +
        circley * sinA;

      const ooz = 1 / z;

      const xp = Math.floor(
        cols / 2 +
        K1 * ooz * x
      );

      const yp = Math.floor(
        rows / 2 -
        K1 * ooz * y * 0.5
      );

      const L =
        cosphi * costheta * sinB -
        cosA * costheta * sinphi -
        sinA * sintheta +
        cosB *
          (
            cosA * sintheta -
            costheta * sinA * sinphi
          );

      if (L > 0) {

        const idx = xp + cols * yp;

        if (
          xp >= 0 &&
          xp < cols &&
          yp >= 0 &&
          yp < rows &&
          ooz > zbuffer[idx]
        ) {

          zbuffer[idx] = ooz;

          const shadeIdx = Math.min(
            11,
            Math.max(
              0,
              Math.floor(L * 8)
            )
          );

          output[idx] = shades[shadeIdx];
        }
      }
    }
  }

  for (let y = 0; y < rows; y++) {

    for (let x = 0; x < cols; x++) {

      const idx = x + cols * y;
      const color = output[idx];

      if (color) {

        ctx.fillStyle = color;

        ctx.fillText(
          '@',
          x * fontSize * 0.6,
          y * fontSize
        );
      }
    }
  }

  A += 0.008;
  B += 0.004;

  requestAnimationFrame(frame);
}

if (
  !window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
) {
  requestAnimationFrame(frame);
}