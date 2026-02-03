import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from "@/test/renderWithProviders";
import { PolicyDetailPage } from "./PolicyDetailPage";

test('update policy status', async () => {
  const user = userEvent.setup();
  renderWithProviders(<PolicyDetailPage />, {
    route: '/policies/pol_1',
    path: '/policies/:policyId'
  });

  expect(await screen.findByRole("heading", { name: /Policy P-/i })).toBeInTheDocument();

  await user.selectOptions(screen.getByLabelText(/policy status/i), 'Lapsed');
  await user.click(screen.getByRole('button', { name: /save/i }));

  expect(await screen.findByText(/status updated/i)).toBeInTheDocument();
})

test('opens and closes Open Case modal', async () => {
  const user = userEvent.setup();
  renderWithProviders(<PolicyDetailPage />, {
    route: '/policies/pol_1',
    path: '/policies/:policyId'
  });

  //Wait for page to load
  await screen.findByText(/Policy/i);

  await user.click(screen.getByRole('button', { name: /open case/i }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
})