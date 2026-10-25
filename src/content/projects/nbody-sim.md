---
title: nbody-sim
date: 2026-07-02
order: 80
status: done
lang: Rust
repo: https://github.com/sabfodel/N-Body-Gravity-Simulation-Computational-Astrophysics
summary: N-body gravity simulation with RK4 and parallel force calculation, checked against Kepler's laws.
tags: [classical-mechanics, numerical-methods, rust, simulation]
featured: true
cover: /img/work/nbody-energy-drift.svg
coverAlt: Log-scale plot of relative energy error over 100 years — Euler climbs to about 10^-1, RK4 stays near 10^-9.
caption: Relative energy error for the full solar system over 100 years at dt = 0.001 yr. Same step, same forces — only the integrator changes.
result: RK4 energy drift of 5.4×10⁻⁹ over a 100-year solar-system run, against 6.5×10⁻² for Euler — seven orders of magnitude at the same time step.
---

Written from scratch and finished in a day. The point was simple: see for myself what
numerical integration gets wrong, and how badly.

## What it does

Integrates the motion of $N$ bodies under mutual gravity, in units of AU, years and solar
masses (so $G = 4\pi^2$):

$$
\ddot{\mathbf{r}}_i = -G \sum_{j \neq i}
\frac{m_j (\mathbf{r}_i - \mathbf{r}_j)}{\|\mathbf{r}_i - \mathbf{r}_j\|^3}
$$

- RK4 integrator, with Euler kept as a reference
- $O(N^2)$ force evaluation, parallelised with Rayon
- Softening parameter to keep close encounters from blowing up
- Energy, momentum and angular momentum tracked at every snapshot

## Results

**Kepler validation.** A two-body Sun–Earth system started at perihelion, compared against
the analytical orbit:

| Parameter | Analytical | Simulation | Rel. error |
|---|---|---|---|
| Orbital period | 365.2495 days | 365.2683 days | 5.2×10⁻⁵ |
| Eccentricity | 0.01670 | 0.01670 | 2.9×10⁻¹¹ |

The period error comes from how finely perihelion passages are detected (half a time step),
not from the integrator.

**Energy drift.** Full nine-body solar system, 100 years, $\Delta t = 0.001$ yr:

| Integrator | Final $\lvert \Delta E / E_0 \rvert$ |
|---|---|
| RK4 | 5.4×10⁻⁹ |
| Euler | 6.5×10⁻² |

**Parallel speed-up.** Rayon only pays off once $N$ is large enough to amortise the thread
pool: 1.0× at $N = 100$, about 6× from $N = 500$ upward on 16 logical cores.

## What I learned

**RK4 is accurate, but it isn't symplectic.** Its energy error is tiny over a century, but it
still grows systematically rather than oscillating. That is exactly why long orbital runs use
symplectic integrators — and the obvious next step for this code.

**Softening isn't a hack, it's a modelling choice.** When two bodies get arbitrarily close
the force diverges and no step size saves you. The potential has to use the matching softened
form, or $E = K + U$ stops being consistent with the force law.

**Tests should check physics, not code paths.** The suite checks Newton's third law,
conservation laws and Kepler's third law — not just that functions return.

## Limitations

- Fixed time step; close encounters would need adaptive stepping.
- $O(N^2)$ forces — fine for a solar system, not for a galaxy (that needs Barnes–Hut).
- RK4 only; no symplectic integrator yet.
