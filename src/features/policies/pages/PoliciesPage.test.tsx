import { screen, within } from '@testing-library/react';
import { renderWithProviders } from "@/test/renderWithProviders"
import { PoliciesPage } from "./PoliciesPage"

test('renders policies after loading', async () => {
  renderWithProviders(<PoliciesPage />);

  // Assert policy rows (in addition to header) exist
  const table = await screen.findByRole("table");
  const rows = within(table).getAllByRole("row"); // includes header row

  expect(rows.length).toBeGreaterThan(1); // header + at least 1 data row
})