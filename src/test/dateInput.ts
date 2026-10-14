import { screen } from '@testing-library/react';

export function getDateInput(label: string): HTMLInputElement {
  const input = screen
    .getAllByLabelText(label)
    .find(
      (element): element is HTMLInputElement => element.tagName === 'INPUT',
    );
  if (!input) throw new Error(`No date input labelled "${label}".`);
  return input;
}
