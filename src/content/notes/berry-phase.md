---
title: The Berry phase — an adiabatic detour
date: 2026-07-25
field: quantum mechanics
summary: The geometric phase left over from the adiabatic theorem, and why it isn't a gauge artefact.
tags: [quantum-mechanics, topology, geometric-phase, lecture-notes]
---

For a long time I waved this off as "just a phase, you can't measure it". Finding out that
it's both measurable and topological was one of the more satisfying moments of the term.

## The adiabatic setting

Let the Hamiltonian depend on a set of parameters: $H(\mathbf{R}(t))$. The instantaneous
eigenstates are

$$
H(\mathbf{R})\,|n(\mathbf{R})\rangle = E_n(\mathbf{R})\,|n(\mathbf{R})\rangle
$$

The adiabatic theorem says that if you vary the parameters slowly enough, the system stays
in level $n$. But what does it pick up along the way?

$$
|\psi(t)\rangle = e^{i\gamma_n(t)}\,
\exp\!\left[-\frac{i}{\hbar}\int_0^t E_n(\mathbf{R}(t'))\,dt'\right]
|n(\mathbf{R}(t))\rangle
$$

The second exponential is the familiar dynamical phase. The first is something extra — the
Berry phase.

## The geometric phase

Substituting into the Schrödinger equation and rearranging gives

$$
\gamma_n = i \oint_{\mathcal{C}} \langle n(\mathbf{R}) \mid \nabla_\mathbf{R} n(\mathbf{R}) \rangle \cdot d\mathbf{R}
$$

Note what's missing: **there is no time in this integral**. It depends only on the path
$\mathcal{C}$ traced through parameter space. How slowly you went doesn't matter; which way
you went does. Hence *geometric*.

The object inside is the Berry connection:

$$
\mathbf{A}_n(\mathbf{R}) = i\,\langle n \mid \nabla_\mathbf{R} n \rangle
$$

## The "it's just gauge" objection, and the answer

Under the choice $|n(\mathbf{R})\rangle \to e^{i\chi(\mathbf{R})}|n(\mathbf{R})\rangle$ the
connection shifts: $\mathbf{A}_n \to \mathbf{A}_n - \nabla\chi$. So it *is* gauge dependent,
exactly like the vector potential in electromagnetism. The objection looks fair.

But integrate around a **closed** loop and, as long as $\chi$ is single-valued, its
contribution is $2\pi \times$ an integer — so $e^{i\gamma_n}$ is unchanged. The observable
survives.

Better still, take the curl and the gauge dependence disappears entirely. This is the Berry
curvature:

$$
\boldsymbol{\Omega}_n = \nabla_\mathbf{R} \times \mathbf{A}_n
$$

a "magnetic field" living in parameter space. Degeneracy points act as its sources, behaving
like magnetic monopoles.

## Where it connects

- **In solids:** the parameter space is the Brillouin zone, $\mathbf{R} \to \mathbf{k}$.
  Integrating the curvature over the zone gives the Chern number, and it comes out an
  integer. That's the answer to why quantum Hall conductance is quantised so precisely.
- **The Aharonov–Bohm effect** is a special case of this.
- It also answers the phase-freedom question left open in
  [Bloch's theorem](/notes/bloch-theorem/).

## Open questions

- The adiabatic assumption breaks down at a degeneracy — what actually happens near one?
- How does the non-abelian generalisation (Wilczek–Zee) work? Haven't looked yet.

## References

- Berry, *Quantal phase factors accompanying adiabatic changes* (1984)
- Griffiths, *Introduction to Quantum Mechanics*, ch. 11
- Bernevig, *Topological Insulators and Topological Superconductors*, ch. 1–2
