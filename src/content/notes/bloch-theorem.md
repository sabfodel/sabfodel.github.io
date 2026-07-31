---
title: Bloch's theorem and periodic potentials
date: 2026-07-12
field: condensed matter
summary: Why single-particle solutions in a crystal have to take the form plane wave × periodic function.
tags: [condensed-matter, band-theory, lecture-notes]
---

The first real theorem in solid state physics. It tells you what the discrete translational
symmetry of a crystal forces on single-particle eigenstates.

## Setup

Let the lattice vectors be $\mathbf{R} = n_1\mathbf{a}_1 + n_2\mathbf{a}_2 + n_3\mathbf{a}_3$.
The potential is lattice-periodic:

$$
V(\mathbf{r} + \mathbf{R}) = V(\mathbf{r})
$$

Define the translation operator by $T_\mathbf{R}\,\psi(\mathbf{r}) = \psi(\mathbf{r} + \mathbf{R})$.
Periodicity gives $[H, T_\mathbf{R}] = 0$, and translations compose:
$T_\mathbf{R} T_{\mathbf{R}'} = T_{\mathbf{R} + \mathbf{R}'}$.

## Derivation

Since the translations commute with each other and with $H$, we can pick simultaneous
eigenstates. $T_\mathbf{R}$ is unitary, so its eigenvalues have unit modulus:

$$
T_\mathbf{R}\,\psi = c(\mathbf{R})\,\psi, \qquad |c(\mathbf{R})| = 1
$$

The composition rule forces $c(\mathbf{R})c(\mathbf{R}') = c(\mathbf{R} + \mathbf{R}')$, and
the only unit-modulus function satisfying that is an exponential:

$$
c(\mathbf{R}) = e^{i\mathbf{k}\cdot\mathbf{R}}
$$

which gives Bloch's theorem:

$$
\psi_{n\mathbf{k}}(\mathbf{r}) = e^{i\mathbf{k}\cdot\mathbf{r}}\, u_{n\mathbf{k}}(\mathbf{r}),
\qquad
u_{n\mathbf{k}}(\mathbf{r} + \mathbf{R}) = u_{n\mathbf{k}}(\mathbf{r})
$$

A free-particle plane wave, modulated at the period of the lattice.

## Why it matters

**1. $\mathbf{k}$ is a quantum number, not a momentum.** Continuous translational symmetry
is broken, so $\mathbf{k}$ isn't a conserved physical momentum — it's *crystal momentum*.
Adding a reciprocal lattice vector $\mathbf{G}$ changes nothing physical:

$$
e^{i(\mathbf{k}+\mathbf{G})\cdot\mathbf{R}} = e^{i\mathbf{k}\cdot\mathbf{R}}
\quad \text{since} \quad \mathbf{G}\cdot\mathbf{R} = 2\pi m
$$

So folding $\mathbf{k}$ into the first Brillouin zone loses no information.

**2. Bands fall out of this.** At fixed $\mathbf{k}$, solving for $u_{n\mathbf{k}}$ is a
problem confined to one unit cell, which gives a discrete spectrum indexed by $n$ — the band
index. Sweeping $\mathbf{k}$ traces out $E_n(\mathbf{k})$ continuously: the band structure.

**3. It inverts your intuition about resistance.** In a perfect periodic lattice electrons
*don't scatter* — Bloch states are stationary. Resistance comes from breaking the
periodicity: phonons, impurities, defects. That felt backwards the first time I heard it,
and I still like it.

## Open questions

- The phase freedom in how $u_{n\mathbf{k}}$ depends on $\mathbf{k}$ (a gauge freedom) —
  does it carry anything physical? It does, and it's called the
  [Berry phase](/notes/berry-phase/).
- What happens in a finite crystal? Surface states sit outside this derivation entirely.

## References

- Ashcroft & Mermin, *Solid State Physics*, ch. 8
- Kittel, *Introduction to Solid State Physics*, ch. 7
