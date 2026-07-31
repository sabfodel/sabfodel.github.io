---
title: gargantua-rs
date: 2026-06-18
order: 90
status: active
lang: Rust
repo: https://github.com/sabfodel/gargantua-rs
summary: A ray tracer that follows light around a Schwarzschild black hole.
tags: [general-relativity, rust, graphics, simulation]
---

I wanted to know how the image in *Interstellar* was computed, so I had a go at it myself.

## What it does

Traces every ray from the camera backwards, integrating the null geodesic equation in the
Schwarzschild metric. A ray either falls through the event horizon (black pixel) or escapes
to infinity and hits the background sky map. The result: gravitational lensing, the photon
sphere, and that bright ring around the horizon.

- RK4 geodesic integration with adaptive stepping
- Full 3D orbits rather than reducing to the equatorial plane
- Parallel pixel evaluation with Rayon
- PPM/PNG output

## What I learned

**Conserved quantities do the heavy lifting.** Using conservation of energy and angular
momentum cuts four equations down to two — faster and numerically far better behaved.

**Step size is everything.** Integrating with a fixed step near the photon sphere produced
nonsense orbits. Scaling the step to local curvature fixed it.

**Backwards is the right direction.** Camera to source, not source to camera — that way you
only compute rays that actually land on screen.

## Next

- The Kerr metric, so I can see frame dragging
- An accretion disc with Doppler shift
- Redshift-based colouring
