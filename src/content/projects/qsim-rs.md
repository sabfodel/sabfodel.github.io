---
title: qsim-rs
date: 2026-05-10
order: 100
status: active
lang: Rust
repo: https://github.com/sabfodel/qsim-rs
summary: A state-vector quantum circuit simulator written from scratch.
tags: [quantum-computing, rust, simulation]
---

My answer to "what does a quantum circuit simulator actually *do*?" was to write one and
find out.

## What it does

Holds an $n$-qubit system as a $2^n$-dimensional complex state vector and applies gates to
it. Rather than building full matrices for single-qubit gates, it walks the relevant pairs
of indices and updates in place — much easier on memory.

- Single-qubit gates: `X`, `Y`, `Z`, `H`, `S`, `T`, `RX/RY/RZ`
- Two-qubit: `CNOT`, `CZ`, `SWAP`
- Measurement with state collapse
- A circuit builder API

## What I learned

**Controlled gates are just index masking.** Flip the target bit only on those indices where
the control bit is 1 — no separate $4 \times 4$ matrix needed. That made the code both
faster and shorter.

**Floating-point error accumulates.** Watching the norm drift away from 1 over long circuits
taught me to renormalise periodically.

**Rust's ownership model genuinely helped here** — the bugs where two code paths try to
write into the state vector at once got caught at compile time.

## Next

- A stabiliser simulator, to escape the exponential cost for Clifford circuits
- Syndrome measurement on a small toric code lattice
- Density-matrix mode and noise channels
