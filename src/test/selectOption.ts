import { fireEvent, screen, within } from '@testing-library/react';

export async function selectOption(label: string, option: string) {
  fireEvent.mouseDown(await screen.findByRole('combobox', { name: label }));
  fireEvent.click(
    within(screen.getByRole('listbox')).getByRole('option', { name: option }),
  );
}
