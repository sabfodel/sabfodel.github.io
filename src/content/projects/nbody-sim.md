---
title: nbody-sim
date: 2026-07-02
order: 80
status: done
lang: Rust
repo: https://github.com/sabfodel/nbody-sim
summary: N-body gravity simulation — RK4 integrator with Rayon-parallel force evaluation.
tags: [classical-mechanics, rust, simulation]
---

Written from scratch and finished in a day. The point was simple: see for myself what
numerical integration gets wrong, and how badly.

## What it does

Integrates the motion of $N$ bodies under mutual gravity:

$$
\ddot{\mathbf{r}}_i = -G \sum_{j \neq i}
\frac{m_j (\mathbf{r}_i - \mathbf{r}_j)}{\|\mathbf{r}_i - \mathbf{r}_j\|^3}
$$

- RK4 integrator
- $O(N^2)$ force evaluation, parallelised with Rayon
- Softening parameter to keep close encounters from blowing up
- Energy and momentum tracking

## What I learned

**RK4 isn't always the right choice.** It's high order and accurate, but it isn't symplectic
— over long orbital runs the total energy drifts systematically. Doing the same integration
with Velocity Verlet gives energy that oscillates but doesn't drift. Seeing that in a table
of my own numbers was far more convincing than reading it in a textbook.

**Softening isn't a hack, it's a modelling choice.** When two bodies get arbitrarily close
the force diverges and no step size saves you.

**Parallelising was easier than expected.** Rayon's `par_iter` did it in one line; the real
work was arranging the data for shared access.

## Outcome

It works, it doesn't misbehave, and it's closed. I'd have liked to add a symplectic
integrator, but that's a project of its own.
