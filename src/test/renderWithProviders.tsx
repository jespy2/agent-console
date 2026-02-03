import type { ReactNode } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render } from "@testing-library/react";
import { AppProviders } from "@/app/providers";

type RenderOptions = {
  route?: string;
  path?: string;
};

export const renderWithProviders = (
  ui: ReactNode,
  options: RenderOptions = {}
) => {
  const route = options.route ?? "/policies";
  const path = options.path ?? route;

  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          {/* Route element expects a ReactElement, but the helper takes ReactNode, hence any */}
          <Route path={path} element={ui as any} /> 
        </Routes>
      </MemoryRouter>
    </AppProviders>
  );
};
