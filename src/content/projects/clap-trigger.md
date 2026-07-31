---
title: clap-trigger
date: 2026-07-15
order: 70
status: paused
lang: Python
summary: A small desktop assistant triggered by a double clap — spoken status report and project shortcuts.
tags: [audio, python, automation, for-fun]
---

Written purely to amuse myself. It listens to the microphone, and when it hears two quick
claps it opens my working environment and reads me a short status report out loud.

## What it does

- Watches the mic stream for sudden amplitude spikes
- Fires when two spikes land inside a given time window
- Opens project folders and tools
- Reads a short status report via text-to-speech

## What I learned

**Threshold tuning is the whole problem.** A fixed amplitude threshold either triggered on a
slamming door or missed real claps. An adaptive threshold tracking a moving average was far
more robust.

**Keep the timing window tight.** Requiring the gap between claps to fall in 150–600 ms
cut false positives to almost nothing.

## Why it's paused

It works, but leaving a microphone listening in the background all day is wearing on both
battery and peace of mind. I could bind it to a hotkey instead — at which point the whole
joke is gone.
