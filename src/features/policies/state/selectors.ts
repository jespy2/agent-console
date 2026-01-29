import type { RootState } from "@/app/store";

export const selectPoliciesFilters = (state: RootState) => state.policiesUi;

export const selectSearch = (state: RootState) => state.policiesUi.search;
export const selectStatus = (state: RootState) => state.policiesUi.status;
export const selectPage = (state: RootState) => state.policiesUi.page;
export const selectLimit = (state: RootState) => state.policiesUi.limit;