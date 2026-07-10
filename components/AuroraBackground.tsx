"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 asp = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = v_uv * asp * 1.7;
  vec2 m = u_mouse * asp * 1.7;

  // cursor swirl — rotate the field locally around the mouse
  float d = length(p - m);
  float influence = exp(-d * d * 1.1);
  float ang = influence * 1.0;
  vec2 rel = p - m;
  mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  p = m + rot * rel;

  // domain-warped fbm — the "liquid aurora"
  float t = u_time * 0.07;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.4),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.3)
  );
  float f = fbm(p + 3.0 * r);

  vec3 base = vec3(0.066, 0.078, 0.082);   // #111415
  vec3 orange = vec3(1.0, 0.624, 0.11);    // #ff9f1c
  vec3 amber = vec3(1.0, 0.776, 0.545);    // #ffc68b
  vec3 teal = vec3(0.27, 0.867, 0.737);    // #45ddbc

  // carve distinct ribbons out of the field — dark space between them
  float ribbon = smoothstep(0.55, 0.8, f);
  float core = smoothstep(0.7, 0.94, f);
  float tealBand = smoothstep(0.88, 1.12, length(r)) * (1.0 - ribbon);

  vec3 col = base;
  col = mix(col, orange, ribbon * 0.4);
  col = mix(col, amber, core * 0.3);
  col = mix(col, teal, tealBand * 0.22);

  // hot ember right at the cursor
  col += orange * influence * 0.15;

  // vignette so edges melt into the page
  float vig = smoothstep(1.25, 0.25, length(v_uv - 0.5) * 1.7);
  col = mix(base, col, vig);

  gl_FragColor = vec4(col, 1.0);
}`;

/** WebGL liquid-aurora hero background that swirls around the cursor. */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const section = canvas?.parentElement?.parentElement;
    if (!canvas || !section) return;

    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // render at reduced resolution — it's blurry by nature, huge perf win
    const SCALE = 0.5;
    const sync = () => {
      const w = Math.floor(canvas.clientWidth * SCALE);
      const h = Math.floor(canvas.clientHeight * SCALE);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    const ro = new ResizeObserver(sync);
    ro.observe(canvas);
    sync();

    const target = { x: 0.5, y: 0.45 };
    const pos = { ...target };
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1.0 - (e.clientY - r.top) / r.height;
    };
    section.addEventListener("mousemove", onMove);

    // only render while the hero is on screen
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    const render = (t: number) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      pos.x += (target.x - pos.x) * 0.045;
      pos.y += (target.y - pos.y) * 0.045;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, pos.x, pos.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ display: "block" }}
      />
      {/* fade the shader into the page at top and bottom */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-canvas to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  );
}
