---
title: qsim-rs
date: 2026-05-10
order: 90
status: active
lang: Rust
repo: https://github.com/sabfodel/qsim-rs
summary: A state-vector quantum circuit simulator written from first principles — no quantum SDK, no linear-algebra crate doing the physics.
tags: [quantum-computing, rust, simulation]
featured: true
cover: /img/work/qsim-bell.svg
coverAlt: Circuit diagram of a Bell-state preparation — a Hadamard on qubit 0 followed by a CNOT onto qubit 1 — next to a histogram with only the outcomes 00 and 11.
caption: The Bell-state example. Over 1024 shots only 00 and 11 appear — the two qubits are perfectly correlated.
result: Tests check physics, not code paths — unitarity of every gate, H² = I, HZH = X, Bell and GHZ correlations, and an 80k-shot histogram flat within 4σ.
---

I use Qiskit for quantum computing coursework, but I wanted to know what a simulator actually
does when you call `run()`. So I wrote one.

## How it works

An $n$-qubit pure state is a vector of $2^n$ complex amplitudes. Index $i$ in binary labels
the basis state $\lvert i \rangle$; qubit 0 is the least significant bit, matching Qiskit.

**The stride trick.** A single-qubit gate on qubit $t$ only couples amplitude pairs whose
indices differ in bit $t$. With $s = 2^t$, those pairs are $(i,\ i + s)$ for every $i$ with
bit $t$ clear, and each pair is updated by the $2 \times 2$ unitary:

$$
\begin{pmatrix} a' \\ b' \end{pmatrix} =
\begin{pmatrix} u_{00} & u_{01} \\ u_{10} & u_{11} \end{pmatrix}
\begin{pmatrix} a \\ b \end{pmatrix}
$$

One pass over the vector, $O(2^n)$, and no $2^n \times 2^n$ matrix is ever built.

**Controlled gates are index masking.** Apply the same $2 \times 2$ block only where the control
bit is set. CNOT is a controlled-X; no separate $4 \times 4$ matrix needed.

**Measurement** samples from $\lvert \text{amplitude} \rvert^2$ (the Born rule) for full-register
shots, or does a projective single-qubit measurement with collapse and renormalisation.

## Gate set

`H`, `X`, `Y`, `Z`, `S`, `T`, `Rx`, `Ry`, `Rz`, `CNOT`, `CZ` — with a builder API:

```rust
// Bell state: H on q0, then CNOT(q0 → q1)
let state = Circuit::new(2).h(0).cnot(0, 1).run();
```

## What I learned

**Qubit ordering is a convention you must pick on day one.** Half the confusion in comparing
against textbooks comes from little- vs big-endian labelling.

**Interference is the test that matters.** $H^2 = I$ restores $\lvert 0 \rangle$ exactly, which no
classical probability model reproduces — it's the cleanest check that the amplitudes, not just
the probabilities, are right.

## Limitations

- Exponential memory: every extra qubit doubles the state vector.
- Pure states only — no noise or mixed states yet.

## Next

- Grover's algorithm example (oracle + diffuser)
- BB84 key distribution
- Noise channels (depolarising, amplitude damping)
- Benchmark against Qiskit Aer's statevector output
