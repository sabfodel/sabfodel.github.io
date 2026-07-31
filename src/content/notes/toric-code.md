---
title: First pass at the toric code
date: 2026-07-20
field: quantum information
summary: Working out why the torus matters, how the stabilisers commute, and what topological protection actually buys you.
tags: [quantum-information, topology, quantum-error-correction, lecture-notes]
---

I spent a week on Kitaev's toric code and I think I'm close to the "oh, right" moment.
Writing it down so I can find my way back.

## What tripped me up

On a first read I couldn't see why it had to be a *torus*. Periodic boundary conditions
looked like a computational convenience. They aren't. The number of encoded qubits depends
directly on the topology of the surface — you get $k = 2$ logical qubits on a torus, and
zero on a sphere. The stored information doesn't live anywhere *local*; it lives in winding
classes.

Once that landed, "topological protection" stopped being a slogan and became a mechanism.
Local noise applies local operators. To corrupt the logical information you need an operator
that wraps all the way around the torus — so a small error has to grow into a chain the size
of the system, and that probability is exponentially suppressed.

## The stabilisers

The Hamiltonian is the familiar one:

$$
H = -\sum_{v} A_v - \sum_{p} B_p,
\qquad
A_v = \prod_{j \in v} \sigma^x_j,
\qquad
B_p = \prod_{j \in p} \sigma^z_j
$$

$A_v$ is a product of $X$ over the four bonds meeting at a vertex, $B_p$ a product of $Z$
around a plaquette. They all commute, because any given vertex and plaquette either share no
bonds at all or share exactly **two** — and two minus signs cancel. I didn't believe this
until I drew it once by hand; after that it was obvious.

The ground space is the set of states with $A_v = B_p = +1$ everywhere. Excitations are
violations: $A_v = -1$ puts a "charge" at that vertex, $B_p = -1$ puts a "flux" on that
plaquette. And they never appear alone — always in pairs, at the two ends of a chain.

## Still unresolved

I haven't digested the anyonic statistics yet. Taking a charge around a flux multiplies the
state by $-1$ — neither fermion nor boson. I can connect this to the braid group failing to
collapse to the permutation group in two dimensions, but I can't yet *feel* why two
dimensions is special.

That's the next stop. I'd also very much like to simulate a small lattice in
[qsim-rs](/projects/qsim-rs/) — even $3 \times 3$ would do — and watch the syndrome
measurements with my own eyes.
