/**
 * Sıvı metal kelime işareti — collidingScopes/liquid-logo'nun parça gölgelendiricisinden
 * uyarlandı. Logo görseli yerine Nerd Font ile çizilmiş metin dokusu kullanılır; geniş
 * (yatay) tuvallere uyması için desen koordinatları en uzun kenara göre ölçeklenir.
 *
 * Kaynak: https://github.com/collidingScopes/liquid-logo
 *
 * MIT License
 *
 * Copyright (c) 2025 Alan Ang
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const LOGO_FONT = 'BlexMono Nerd';
/** nf-md-atom */
export const ATOM = '\u{F0768}';

const VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_speed, u_iter, u_scale, u_dot, u_dotMul, u_vOff, u_int, u_exp, u_noise, u_shift, u_edge, u_pScale, u_grain;
uniform vec3 u_col;
uniform sampler2D u_tex;

float random(vec2 st){ return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123); }
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
float edges(vec2 uv){
  vec2 d = 1.0 / u_res;
  vec4 c = texture2D(u_tex, uv);
  float diff = length(c - texture2D(u_tex, uv - vec2(d.x, 0.0))) + length(c - texture2D(u_tex, uv + vec2(d.x, 0.0)))
             + length(c - texture2D(u_tex, uv - vec2(0.0, d.y))) + length(c - texture2D(u_tex, uv + vec2(0.0, d.y)));
  return smoothstep(0.0, 0.2, diff);
}
void main(){
  vec2 r = u_res;
  vec2 FC = gl_FragCoord.xy;
  float time = u_time * u_speed;
  vec2 uv = FC / r;
  uv.y = 1.0 - uv.y;
  float a = texture2D(u_tex, uv).a;
  if (a <= 0.1) discard;
  float edge = edges(uv) * u_edge;

  // geniş tuval: desen koordinatları uzun kenara göre
  vec2 p = (FC * 2.0 - r) / max(r.x, r.y) * u_pScale;
  vec2 l = vec2(0.0);
  l.x += abs(u_dot - dot(p, p)) * u_dotMul;
  vec2 v = p * (1.0 - l.x) / u_scale;
  v += vec2(sin(edge * 10.0), cos(edge * 8.0)) * edge * 20.0;
  float flow = snoise(vec3(p * 2.0, time * 0.15)) * u_noise;
  v += vec2(flow, flow * 0.7);

  vec4 o = vec4(0.0);
  for (float i = 0.0; i < 16.0; i++) {
    if (i >= u_iter) break;
    float idx = i + 1.0;
    vec2 off = cos(v.yx * idx + vec2(0.0, idx) + time) / idx + u_vOff;
    if (edge > 0.1) off *= 1.0 + edge * 4.0;
    v += off;
    o += (sin(vec4(v.x, v.y, v.y, v.x)) + 1.0) * abs(v.x - v.y) * u_int;
  }
  if (u_shift > 0.0) o = o.wxyz * u_shift + o * (1.0 - u_shift);
  vec4 expPy = exp(p.y * vec4(u_col, 0.0));
  float expLx = exp(-u_exp * l.x);
  vec4 ratio = expPy * expLx / o;
  vec4 e2 = exp(2.0 * ratio);
  o = (e2 - 1.0) / (e2 + 1.0);
  o += vec4((random(FC / 1.5) * 0.12 - 0.075) * u_grain);
  float hl = pow(0.5 + 0.5 * sin(edge * 6.0), 8.0) * edge;
  o.rgb += hl * vec3(0.4, 0.3, 0.5);
  o = clamp(o, 0.0, 1.0);

  vec4 col = mix(o, vec4(o.rgb * 0.8 + 0.2, a), 0.3);
  col.rgb += pow(edge * 1.2, 4.0) * vec3(0.6, 0.7, 0.8);
  col.a = min(col.a + 0.4, 1.0) * a;
  gl_FragColor = col;
}`;

/** liquid-logo'nun "Galaxy" ön ayarı: camgöbeği sıvı, bakır-kırmızı parlamalar */
export const PRESET = {
  speed: 0.44,
  iterations: 8,
  scale: 2.63,
  dotFactor: 0.03,
  dotMultiplier: 0.3,
  vOffset: 0,
  intensityFactor: 0.37,
  expFactor: 0.5,
  noiseIntensity: 1.2,
  color: [1, -0.3, 1.6] as [number, number, number],
  colorShift: 0.1,
  edge: 0.1,
  pScale: 2.2,
  grain: 0.5,
};

export type LiquidPreset = typeof PRESET;

let fontReady: Promise<unknown> | null = null;
export function loadLogoFont() {
  if (!fontReady) {
    const face = new FontFace(LOGO_FONT, 'url(/fonts/blexmono-nerd-bold.woff2) format("woff2")', { weight: '700' });
    document.fonts.add(face);
    fontReady = face.load().catch(() => null);
  }
  return fontReady;
}

type Opts = {
  text: string;
  /** CSS piksel cinsinden yazı yüksekliği */
  size: number;
  /** yatay ve dikey iç boşluk (yazı boyutunun katı) */
  pad?: number;
  /** hareketi azalt: tek kare çiz */
  still?: boolean;
  preset?: Partial<LiquidPreset>;
};

/**
 * Tuvali metne göre boyutlandırır ve canlandırır. WebGL yoksa false döner;
 * çağıran yedek metni görünür bırakır.
 */
export async function mountLiquid(canvas: HTMLCanvasElement, opts: Opts): Promise<boolean> {
  await loadLogoFont();
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true });
  if (!gl) return false;

  const pad = opts.pad ?? 0.25;
  const font = `700 ${opts.size}px "${LOGO_FONT}", "IBM Plex Mono", monospace`;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = font;
  const cssW = Math.ceil(measure.measureText(opts.text).width + opts.size * pad * 2);
  const cssH = Math.ceil(opts.size * (1 + pad * 2));
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.style.width = `${cssW}px`;
  canvas.style.height = `${cssH}px`;
  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);

  // metin dokusu
  const tex = document.createElement('canvas');
  tex.width = canvas.width;
  tex.height = canvas.height;
  const t = tex.getContext('2d')!;
  t.scale(dpr, dpr);
  t.font = font;
  t.textBaseline = 'middle';
  t.fillStyle = '#fff';
  t.fillText(opts.text, opts.size * pad, cssH / 2 + opts.size * 0.04);

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return false;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const P = { ...PRESET, ...opts.preset };
  gl.uniform2f(u('u_res'), canvas.width, canvas.height);
  gl.uniform1f(u('u_speed'), P.speed);
  gl.uniform1f(u('u_iter'), P.iterations);
  gl.uniform1f(u('u_scale'), P.scale);
  gl.uniform1f(u('u_dot'), P.dotFactor);
  gl.uniform1f(u('u_dotMul'), P.dotMultiplier);
  gl.uniform1f(u('u_vOff'), P.vOffset);
  gl.uniform1f(u('u_int'), P.intensityFactor);
  gl.uniform1f(u('u_exp'), P.expFactor);
  gl.uniform1f(u('u_noise'), P.noiseIntensity);
  gl.uniform1f(u('u_shift'), P.colorShift);
  gl.uniform1f(u('u_edge'), P.edge);
  gl.uniform1f(u('u_pScale'), P.pScale);
  gl.uniform1f(u('u_grain'), P.grain);
  gl.uniform3f(u('u_col'), ...P.color);
  gl.uniform1i(u('u_tex'), 0);
  const uTime = u('u_time');

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const draw = (ms: number) => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, ms / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  if (opts.still) {
    draw(4000);
    return true;
  }

  // yalnızca görünürken canlandır
  let raf = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
    draw(now - t0 + 4000);
    raf = requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) raf = requestAnimationFrame(tick);
    else if (!e.isIntersecting) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }).observe(canvas);
  return true;
}
