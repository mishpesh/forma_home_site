import type { KeyboardEvent } from 'react';
/** Implements the WAI-ARIA radio-group keyboard pattern for choice buttons. */
export function navigateChoice(event: KeyboardEvent<HTMLDivElement>) {
  const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
  if (!keys.includes(event.key)) return;
  const choices = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]'),
  );
  const current = choices.indexOf(document.activeElement as HTMLButtonElement);
  if (current < 0) return;
  event.preventDefault();
  const next =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? choices.length - 1
        : (current + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + choices.length) %
          choices.length;
  choices[next].focus();
  choices[next].click();
}
