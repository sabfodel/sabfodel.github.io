---
title: gargantua-rs
date: 2026-07-12
order: 100
status: active
lang: Rust
repo: https://github.com/sabfodel/gargantua-rs
summary: A general-relativistic ray tracer that follows light around a Schwarzschild black hole — no physics libraries.
tags: [general-relativity, numerical-methods, rust, simulation]
featured: true
cover: /img/work/gargantua-render.png
coverAlt: Rendered Schwarzschild black hole — a dark shadow ringed by a thin accretion disk, with the far side of the disk lensed into an arc above the hole.
coverDark: true
caption: Render from v0.1. The arc above the shadow is the far side of the disk, bent over the top by the hole; the glow beneath it is light that looped underneath.
result: Rays with impact parameter below b = (3√3/2) rₛ ≈ 2.598 rₛ are captured — the shadow size the theory predicts, checked in the test suite.
---

I wanted to know how the image in *Interstellar* was computed, so I had a go at it myself.

## The physics

Working in units $G = c = 1$ with $r_s = 1$, the null geodesic equation of the Schwarzschild
metric reduces to a single Newtonian-looking equation:

$$
\frac{d^2 \mathbf{x}}{d\lambda^2} = -\frac{3}{2}\,\frac{h^2\,\mathbf{x}}{r^5},
\qquad h = \lvert \mathbf{x} \times \mathbf{v} \rvert
$$

where $h$ is the conserved angular momentum. The $r^{-5}$ term is pure spacetime curvature:
it doubles Newton's prediction for light bending and creates the **photon sphere** at
$r = 1.5\,r_s$, where light can orbit the hole.

## What it does

Every pixel is an initial condition. The renderer launches one photon per pixel *backwards*
from the camera and integrates its path. A ray either falls through the horizon (black), hits
the thin accretion disk, or escapes to the background sky.

- Hand-written RK4 integrator, generic over any acceleration field
- Thin disk and procedural starfield
- Parallel pixel evaluation with Rayon
- PNG output at any resolution

## What I learned

**Conserved quantities do the heavy lifting.** Using the conserved angular momentum $h$ turns
the geodesic equation into one compact ODE — faster and numerically better behaved than the
full set of Christoffel terms.

**Backwards is the right direction.** Camera to source, not source to camera — you only compute
rays that actually land on screen.

**Design for the next metric.** New spacetimes plug in by implementing one trait; the
integrator and renderer never change. That is what will make the Kerr version possible.

## Limitations

- Fixed step size. Rays grazing the photon sphere need finer steps than the rest — adaptive
  stepping is the next version.
- No Doppler beaming or gravitational redshift yet, so the disk is unrealistically symmetric.
- Non-rotating hole only.

## Next

- v0.2 — adaptive step size, photon-sphere diagnostics
- v0.3 — Doppler beaming and gravitational redshift on the disk
- v0.4 — Kerr metric: frame dragging and an asymmetric shadow

## References

- A. Riazuelo, *Seeing relativity — I*, [arXiv:1511.06025](https://arxiv.org/abs/1511.06025)
- O. James, E. von Tunzelmann, P. Franklin, K. S. Thorne, *Gravitational lensing by spinning
  black holes in astrophysics, and in the movie Interstellar*,
  [arXiv:1502.03808](https://arxiv.org/abs/1502.03808)
