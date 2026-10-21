'use client';

import { useState, type KeyboardEvent, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ChevronsLeftRight } from 'lucide-react';

export function Comparison() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  const target = useMotionValue(50);
  const smooth = useSpring(target, { stiffness: 520, damping: 46, mass: 0.25 });
  const clipPath = useTransform(smooth, (value) => `inset(0 ${100 - value}% 0 0)`);
  const left = useTransform(smooth, (value) => `${value}%`);

  function update(value: number) {
    const next = Math.round(Math.min(100, Math.max(0, value)) * 10) / 10;
    setPosition(next);
    target.set(next);
    if (reduced) smooth.jump(next);
  }

  function followPointer(event: PointerEvent<HTMLInputElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    update(((event.clientX - bounds.left) / bounds.width) * 100);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const increment = event.shiftKey ? 10 : 1;
    const values: Record<string, number> = {
      ArrowRight: position + increment,
      ArrowUp: position + increment,
      ArrowLeft: position - increment,
      ArrowDown: position - increment,
      PageUp: position + 10,
      PageDown: position - 10,
      Home: 0,
      End: 100,
    };
    if (event.key in values) {
      event.preventDefault();
      update(values[event.key]);
    }
  }

  return (
    <div className="comparison-wrap">
      <div className={`comparison ${dragging ? 'is-dragging' : ''}`}>
        <div
          className="comparison-image after"
          role="img"
          aria-label="Living room after redesign, with a stone coffee table, timber wall panels, leather armchair and warm layered lighting"
        />
        <motion.div
          className="comparison-image before"
          role="img"
          aria-label="Living room before redesign, with beige seating, two windows, radiators and a timber coffee table"
          style={{ clipPath }}
        />
        <span className="comparison-label before-label">Before</span>
        <span className="comparison-label after-label">After</span>
        <motion.div className="comparison-divider" style={{ left }}>
          <span>
            <ChevronsLeftRight strokeWidth={1.5} size={22} />
          </span>
        </motion.div>
        <input
          aria-label="Before and after comparison"
          aria-describedby="comparison-help"
          aria-valuetext={`${Math.round(position)}% before, ${Math.round(100 - position)}% after`}
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={position}
          onChange={(event) => update(Number(event.target.value))}
          onKeyDown={onKeyDown}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus({ preventScroll: true });
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            followPointer(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) followPointer(event);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              followPointer(event);
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
            setDragging(false);
          }}
          onPointerCancel={() => setDragging(false)}
          onLostPointerCapture={() => setDragging(false)}
        />
      </div>
      <div className="comparison-caption">
        <span>A living room, reimagined.</span>
        <span>Independent renovation reference</span>
      </div>
      <p id="comparison-help" className="sr-only">
        Use arrow keys to adjust the comparison. Hold Shift for larger steps.
      </p>
    </div>
  );
}
